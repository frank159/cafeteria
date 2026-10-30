import type { Variants } from "framer-motion";

/* Ease suave compartilhado por todas as variantes */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* Fases do ciclo */
export type Phase = "idle" | "stain" | "clean";

/* Duração de cada fase em ms (a lógica do componente usa estes valores) */
export const TIMING = {
  start: 400, // respiro antes do primeiro ciclo
  stain: 3000, // mancha aparecendo (1.8s) + segurando
  clean: 1700, // pano passando e mancha sumindo
  rest: 700, // mesa limpa antes de recomeçar
} as const;

/* Reset instantâneo: usado quando o elemento já está invisível */
const instant = { duration: 0 };

/* Grupo da mancha: expande de leve ao aparecer e se dissipa ao ser limpa */
export const stainVariants: Variants = {
  idle: { opacity: 0, scale: 0.6, transition: instant },
  stain: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: EASE },
  },
  clean: {
    opacity: 0,
    scale: 1.06,
    // espera o pano chegar perto antes de dissipar
    transition: { duration: 0.9, ease: EASE, delay: 0.55 },
  },
};

/* Anéis: o traço é "desenhado" em volta, como a borda de uma xícara */
export const ringVariants: Variants = {
  idle: { pathLength: 0, transition: instant },
  stain: {
    pathLength: 1,
    transition: { duration: 1.6, ease: EASE },
  },
  clean: { pathLength: 1 },
};

/* Preenchimento: espalha um pouco depois do anel */
export const washVariants: Variants = {
  idle: { opacity: 0, transition: instant },
  stain: {
    opacity: 0.28,
    transition: { duration: 1.4, ease: EASE, delay: 0.3 },
  },
  clean: { opacity: 0.28 },
};

/* Pano: atravessa a mesa da esquerda para a direita, só na fase de limpeza */
export const clothVariants: Variants = {
  idle: { x: 0, opacity: 0, transition: instant },
  stain: { x: 0, opacity: 0, transition: instant },
  clean: {
    x: [0, 560], // viewBox tem 400 de largura + o pano começa fora, à esquerda
    opacity: [0, 0.9, 0.9, 0],
    transition: {
      duration: 1.4,
      ease: EASE,
      opacity: { duration: 1.4, times: [0, 0.15, 0.8, 1], ease: "linear" },
    },
  },
};