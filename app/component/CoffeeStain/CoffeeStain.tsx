"use client";

import { useEffect } from "react";
import { useAnimationControls, useReducedMotion, type Variants } from "framer-motion";
import * as S from "./CoffeeStainStyled";

/* Ease suave compartilhado por todas as etapas */
const EASE = [0.22, 1, 0.36, 1] as const;

/*
  Etapas:
  - hidden:   invisível, levemente menor e girada (estado de repouso/reset)
  - stained:  "carimba": passa um pouco do tamanho final e assenta em 1
  - cleaning: um pano passa da esquerda para a direita (clip-path) enquanto
              a mancha esmaece e expande de leve
*/
export const coffeeStainVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
    clipPath: "inset(0% 0% 0% 0%)",
  },
  stained: {
    opacity: [0, 0.95, 0.95],
    scale: [0.8, 1.06, 1],
    rotate: [-10, 2, 0],
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.3,
      ease: EASE,
      times: [0, 0.55, 1],
    },
  },
  cleaning: {
    opacity: 0,
    scale: 1.04,
    rotate: 1,
    /* a borda esquerda avança até 100%: a mancha some da esquerda para a direita */
    clipPath: "inset(0% 0% 0% 100%)",
    transition: {
      duration: 1.5,
      ease: EASE,
      /* a opacidade termina junto com o pano, sem sumir antes */
      opacity: { duration: 1.5, ease: "easeIn" },
    },
  },
};

type Props = {
  /** Caminho da imagem (acento codificado, pois vai direto no src) */
  src?: string;
  /** Tempo com a mancha visível, em segundos */
  holdSeconds?: number;
  /** Intervalo entre o fim da limpeza e a próxima mancha, em segundos */
  intervalSeconds?: number;
  /** Atraso antes do primeiro ciclo, em segundos */
  startDelaySeconds?: number;
  /** false = roda um ciclo só e termina com a mesa limpa */
  loop?: boolean;
  /** Posicionamento absoluto dentro de um pai com position: relative */
  top?: string;
  left?: string;
  width?: string;
  zIndex?: number;
  /** Chamado ao fim de cada ciclo */
  onCycleComplete?: () => void;
};

const sleep = (seconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));

export default function CoffeeStain({
  src = "/NewImgs/VetorMarcaCaf%C3%A9.svg",
  holdSeconds = 1.8,
  intervalSeconds = 1.2,
  startDelaySeconds = 0.4,
  loop = true,
  top = "50%",
  left = "50%",
  width = "180px",
  zIndex = 1,
  onCycleComplete,
}: Props) {
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    /* menos movimento: mostra a mancha parada, sem ciclo */
    if (reduce) {
      controls.set({ opacity: 0.95, scale: 1, rotate: 0, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    let cancelled = false;

    const run = async () => {
      await sleep(startDelaySeconds);

      do {
        if (cancelled) return;

        /* 1. manchando */
        await controls.start("stained");
        if (cancelled) return;

        /* 2. permanência */
        await sleep(holdSeconds);
        if (cancelled) return;

        /* 3. limpando */
        await controls.start("cleaning");
        if (cancelled) return;

        /* reset instantâneo: já está invisível, então não há "pulo" */
        controls.set("hidden");
        onCycleComplete?.();

        /* 4. intervalo até o próximo ciclo */
        if (loop) await sleep(intervalSeconds);
      } while (loop && !cancelled);
    };

    run();

    /* interrompe o laço ao desmontar ou quando as props mudarem */
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, reduce, loop, holdSeconds, intervalSeconds, startDelaySeconds, onCycleComplete]);

  return (
    <S.Wrapper $top={top} $left={left} $width={width} $z={zIndex} style={{ translate: "-50% -50%" }}>
      <S.Stain
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        variants={coffeeStainVariants}
        initial="hidden"
        animate={controls}
      />
    </S.Wrapper>
  );
}