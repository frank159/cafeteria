"use client";

import { memo, useEffect, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import * as S from "./LoadingStyled";

/* Ease refinado, compartilhado por todas as animações */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ───────── Variantes (somente transform e opacity) ───────── */

/* Overlay: o fundo já nasce sólido. A entrada acontece só no conteúdo. */
const overlayVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  still: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.7, delay: 0.15, ease: EASE } },
};

/* Entrada: sobe 16px, cresce de 0.97 a 1 e aparece, tudo com o mesmo ease */
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: EASE } },
  still: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  exit: { opacity: 0, scale: 1.06, transition: { duration: 0.5, ease: EASE } },
};

/* Vapor: nasce no bico, sobe, estica um pouco e se dissipa. Começa depois da entrada.
   O frame zero de "hidden" é igual ao primeiro keyframe, então não há salto. */
const steamVariants: Variants = {
  hidden: { opacity: 0, y: 10, scaleY: 0.85 },
  visible: (i: number) => ({
    opacity: [0, 0.85, 0],
    y: [10, -6, -18],
    scaleY: [0.85, 1, 1.12],
    transition: {
      duration: 2.8,
      ease: EASE,
      times: [0, 0.45, 1],
      repeat: Infinity,
      delay: 0.7 + i * 0.6,
    },
  }),
  still: { opacity: 0.5, y: 0, scaleY: 1 },
};

/* Chamas: cada uma com ritmo próprio, para não pulsarem juntas */
const flameVariants: Variants = {
  hidden: { opacity: 0.7, scaleY: 0.85, scaleX: 1 },
  visible: (i: number) => ({
    opacity: [0.7, 1, 0.7],
    scaleY: [0.85, 1.15, 0.85],
    scaleX: [1, 0.92, 1],
    transition: {
      duration: 0.8 + i * 0.17,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 0.5,
    },
  }),
  still: { opacity: 0.9, scaleY: 1, scaleX: 1 },
};

/* ───────── Traço de esboço ─────────
   Nada de filtro SVG (caro de renderizar): o tremido vem de caminhos com ruído
   calculado uma única vez, com semente fixa. Assim servidor e cliente geram
   exatamente o mesmo desenho, sem erro de hidratação. */

type Pt = [number, number];

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const f = (n: number) => n.toFixed(1);

/* Contorno à mão: cada aresta é uma curva com o ponto do meio levemente fora da reta */
function rough(points: Pt[], seed: number, jitter = 1.1, close = true) {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 2 * jitter;
  const n = points.length;
  const segs = close ? n : n - 1;
  let d = `M${f(points[0][0] + j())} ${f(points[0][1] + j())}`;
  for (let i = 0; i < segs; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % n];
    d += `Q${f((x1 + x2) / 2 + j() * 1.4)} ${f((y1 + y2) / 2 + j() * 1.4)} ${f(x2 + j())} ${f(y2 + j())}`;
  }
  return d;
}

const poly = (points: Pt[]) =>
  points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("") + "Z";

/* Preenchimento limpo + dois contornos tortos (o segundo mais fraco, como um traço refeito) */
const sketch = (pts: Pt[], seed: number) => ({
  fill: poly(pts),
  a: rough(pts, seed),
  b: rough(pts, seed + 97, 1.5),
});

/* Hachura diagonal (sombreado de lápis), recortada pela forma */
function hatch(x0: number, y0: number, x1: number, y1: number, step: number, seed: number) {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 1.6;
  const h = y1 - y0;
  let d = "";
  for (let x = x0 - h; x < x1; x += step) {
    d += `M${f(x + j())} ${f(y1 + j())}L${f(x + h + j())} ${f(y0 + j())}`;
  }
  return d;
}

const line = (a: Pt, b: Pt, seed: number) => rough([a, b], seed, 0.8, false);

/* ───────── Geometria (viewBox 200 x 240) ───────── */

const INK = "#2b100b";

const UPPER: Pt[] = [[54, 90], [146, 90], [124, 150], [76, 150]];
const LOWER: Pt[] = [[76, 150], [124, 150], [140, 206], [60, 206]];
const LID: Pt[] = [[60, 90], [140, 90], [132, 78], [68, 78]];
const KNOB: Pt[] = [[93, 78], [107, 78], [105, 67], [95, 67]];
const SPOUT: Pt[] = [[43, 82], [63, 88], [57, 99]];
const HEAD: Pt[] = [[84, 238], [116, 238], [112, 224], [88, 224]];
const TRIVET_L: Pt[] = [[36, 207], [66, 207], [66, 211], [36, 211]];
const TRIVET_R: Pt[] = [[134, 207], [164, 207], [164, 211], [134, 211]];

const SHAPES = {
  upper: sketch(UPPER, 11),
  lower: sketch(LOWER, 23),
  lid: sketch(LID, 37),
  knob: sketch(KNOB, 41),
  spout: sketch(SPOUT, 53),
  head: sketch(HEAD, 67),
  trivetL: sketch(TRIVET_L, 71),
  trivetR: sketch(TRIVET_R, 79),
};

/* Alça presa ao corpo (as pontas ficam escondidas atrás dele) */
const HANDLE = rough([[138, 100], [160, 99], [169, 110], [159, 136], [120, 138]], 5, 1, false);
/* Pernas do fogareiro */
const LEGS = line([44, 211], [44, 238], 7) + line([156, 211], [156, 238], 9);

/* Sombreado e facetas */
const HATCH_UPPER = hatch(108, 90, 150, 150, 6, 3);
const HATCH_LOWER = hatch(106, 150, 142, 206, 6, 5);
const FACETS =
  line([76, 91], [86, 150], 13) +
  line([100, 91], [100, 150], 14) +
  line([124, 91], [114, 150], 15) +
  line([86, 151], [78, 206], 16) +
  line([100, 151], [100, 206], 17) +
  line([114, 151], [122, 206], 18);

/* Vapor: sai de DENTRO do bico. Começa em (x, 86), atrás do bico (desenhado depois),
   e só aparece ao sair pela ponta. `dir` alterna o lado da onda. */
const steamPath = (x: number, dir: 1 | -1) =>
  `M${x} 86 C${x - 7 * dir} 76 ${x + 7 * dir} 66 ${x} 56 C${x - 7 * dir} 46 ${x + 7 * dir} 36 ${x} 26`;

const STEAMS = [
  { id: "a", d: steamPath(49, 1) },
  { id: "b", d: steamPath(53, -1) },
  { id: "c", d: steamPath(46, 1) },
] as const;

/* Chamas sobre a boca do fogareiro (base em y = 225) */
const flame = (cx: number, h: number, seed: number) => {
  const base = 225;
  const pts: Pt[] = [
    [cx - 4, base],
    [cx - 5, base - h * 0.45],
    [cx, base - h],
    [cx + 5, base - h * 0.45],
    [cx + 4, base],
  ];
  return {
    outer: `M${cx - 4} ${base}Q${cx - 6} ${f(base - h * 0.55)} ${cx} ${f(base - h)}Q${cx + 6} ${f(base - h * 0.55)} ${cx + 4} ${base}Z`,
    outline: rough(pts, seed, 0.7),
    inner: `M${cx - 2} ${base}Q${cx - 3} ${f(base - h * 0.35)} ${cx} ${f(base - h * 0.6)}Q${cx + 3} ${f(base - h * 0.35)} ${cx + 2} ${base}Z`,
  };
};

const FLAMES = [
  { id: "f1", ...flame(88, 13, 101) },
  { id: "f2", ...flame(96, 18, 103) },
  { id: "f3", ...flame(104, 19, 107) },
  { id: "f4", ...flame(112, 14, 109) },
] as const;

/* Peça com preenchimento + contorno duplo */
function Piece({
  s,
  fill,
  width = 1.7,
}: {
  s: { fill: string; a: string; b: string };
  fill: string;
  width?: number;
}) {
  const stroke = { fill: "none", stroke: INK, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <g>
      <path d={s.fill} fill={fill} />
      <path d={s.a} {...stroke} strokeWidth={width} />
      <path d={s.b} {...stroke} strokeWidth={width * 0.55} opacity={0.55} />
    </g>
  );
}

/* Ilustração: memoizada, não re-renderiza quando o estado do loading muda */
const Illustration = memo(function Illustration() {
  return (
    <S.PotSvg viewBox="0 0 200 240" aria-hidden="true">
      <defs>
        <clipPath id="pot-clip-upper">
          <path d={poly(UPPER)} />
        </clipPath>
        <clipPath id="pot-clip-lower">
          <path d={poly(LOWER)} />
        </clipPath>
      </defs>

      {/* 1. vapor, por baixo de tudo: nasce atrás do bico */}
      {STEAMS.map((s, i) => (
        <S.Steam key={s.id} d={s.d} custom={i} variants={steamVariants} />
      ))}

      {/* 2. alça */}
      <path
        d={HANDLE}
        fill="none"
        stroke="#5a2230"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. fogareiro: pernas, grelhas e boca */}
      <path d={LEGS} fill="none" stroke="#a9bdd6" strokeWidth="3" strokeLinecap="round" />
      <Piece s={SHAPES.trivetL} fill="#8c9db3" width={1.4} />
      <Piece s={SHAPES.trivetR} fill="#8c9db3" width={1.4} />
      <Piece s={SHAPES.head} fill="#a9bdd6" width={1.5} />

      {/* 4. chamas, atrás do pote: as pontas somem sob a base */}
      {FLAMES.map((fl, i) => (
        <S.Flame key={fl.id} custom={i} variants={flameVariants}>
          <path d={fl.outer} fill="#f08a3c" />
          <path d={fl.inner} fill="#ffd08a" />
          <path
            d={fl.outline}
            fill="none"
            stroke="#7a3a14"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </S.Flame>
      ))}

      {/* 5. cafeteira */}
      <Piece s={SHAPES.lower} fill="#d96b50" />
      <Piece s={SHAPES.upper} fill="#e07a5f" />

      {/* sombreado a lápis e facetas, recortados pelo corpo */}
      <g clipPath="url(#pot-clip-upper)">
        <path d={HATCH_UPPER} stroke="#a8472f" strokeWidth="1.1" opacity="0.6" fill="none" strokeLinecap="round" />
      </g>
      <g clipPath="url(#pot-clip-lower)">
        <path d={HATCH_LOWER} stroke="#a8472f" strokeWidth="1.1" opacity="0.6" fill="none" strokeLinecap="round" />
      </g>
      <path d={FACETS} stroke="#a8472f" strokeWidth="1.3" opacity="0.8" fill="none" strokeLinecap="round" />

      {/* pintinhas de tinta */}
      <g fill={INK} opacity="0.55">
        <circle cx="70" cy="132" r="0.9" />
        <circle cx="118" cy="112" r="0.8" />
        <circle cx="90" cy="176" r="0.9" />
        <circle cx="126" cy="190" r="0.8" />
        <circle cx="82" cy="108" r="0.7" />
      </g>

      {/* bico, tampa e botão por cima */}
      <Piece s={SHAPES.spout} fill="#c8644c" />
      <Piece s={SHAPES.lid} fill="#c8644c" />
      <Piece s={SHAPES.knob} fill="#5a2230" width={1.4} />
    </S.PotSvg>
  );
});

/* ───────── Componente ───────── */

type Props = {
  /**
   * Modo controlado: true mostra o loading, false dispara a saída.
   * Se omitido, o componente decide sozinho (página carregada + tempo mínimo).
   */
  isLoading?: boolean;
  /** Modo automático: tempo mínimo na tela, em ms */
  minDuration?: number;
  /** Modo automático: libera a tela depois disso mesmo sem o evento load, em ms */
  maxWait?: number;
  /** Chamado quando a animação de saída termina */
  onExited?: () => void;
};

export default function Loading({
  isLoading,
  minDuration = 2800,
  maxWait = 12000,
  onExited,
}: Props) {
  const reduce = useReducedMotion();
  const controlled = isLoading !== undefined;
  const [ready, setReady] = useState(false);

  /* Modo automático: sai quando a página carregou E o tempo mínimo passou */
  useEffect(() => {
    if (controlled) return;

    let loaded = document.readyState === "complete";
    let minDone = false;

    const check = () => {
      if (loaded && minDone) setReady(true);
    };
    const onLoad = () => {
      loaded = true;
      check();
    };

    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const minTimer = setTimeout(() => {
      minDone = true;
      check();
    }, minDuration);
    const safety = setTimeout(() => setReady(true), maxWait);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(safety);
    };
  }, [controlled, minDuration, maxWait]);

  const visible = controlled ? isLoading : !ready;

  /* Trava o scroll enquanto o loading está na tela */
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    /* LazyMotion: carrega só o necessário do Framer Motion (primeiro load mais leve) */
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <AnimatePresence onExitComplete={onExited}>
          {visible && (
            <S.Overlay
              key="loading"
              role="status"
              aria-label="Carregando"
              variants={overlayVariants}
              initial="hidden"
              animate={reduce ? "still" : "visible"}
              exit="exit"
            >
              <S.Content variants={contentVariants}>
                <Illustration />
              </S.Content>
            </S.Overlay>
          )}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}