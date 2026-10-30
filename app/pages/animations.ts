import type { Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Só inclui `delay` quando ele é passado. Assim o stagger do pai continua valendo. */
const withDelay = (delay?: number) => (delay ? { delay } : {});

/* Container que escalona os filhos (hero) */
export const stagger = (delayChildren = 0, staggerChildren = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, ...withDelay(delay) },
  }),
};

/* Linha do título subindo de dentro de uma máscara */
export const lineUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

/* Anel de café "carimbando" */
export const ringIn: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -35 },
  visible: (delay?: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.1, ease: EASE, ...withDelay(delay) },
  }),
};

/* Tagline escrita da esquerda para a direita */
export const taglineWipe: Variants = {
  hidden: { opacity: 0, clipPath: "inset(-20% 100% -20% -5%)" },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: "inset(-20% -5% -20% -5%)",
    transition: { duration: 1.1, delay, ease: EASE },
  }),
};

export const popStar: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -90 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, delay },
  }),
};

////

/* deixa 0.5% visível, pra o observer enxergar o elemento */
export const clipDown: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0% 0% 99.5% 0%)" },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1, delay, ease: EASE },
  }),
};

export const clipUp: Variants = {
  hidden: { opacity: 0, clipPath: "inset(99.5% 0% 0% 0%)" },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1, delay, ease: EASE },
  }),
};

/* dispara assim que qualquer pedaço entra na tela */
export const inView = (delay = 0) =>
  ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: "some" },
    custom: delay,
  }) as const;

/* Revela a imagem da direita para a esquerda */
export const clipLeft: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0% 0% 0% 99.5%)" },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, delay, ease: EASE },
  }),
};

/* Ícones pequenos entrando com um leve "pulo" */
export const floatIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 16, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};