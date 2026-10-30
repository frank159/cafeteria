import type { Variants } from "framer-motion";

/* Ease orgânico compartilhado por todas as animações */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OPEN = "inset(0% 0% 0% 0%)";
const CLOSED = "inset(0% 0% 100% 0%)"; // cortina recolhida para cima

/*
  Convenção dos estados:
  - hidden:  estado de repouso. Nos elementos fixos é igual ao "visible", então
             nada "cai" na tela. Nos elementos em loop é o frame zero da animação.
  - visible: roda o loop.
  - exit:    saída (AnimatePresence).
  Os rótulos descem do Overlay para todos os filhos, sem precisar repeti-los.
*/

/* Cortina: ao sair, sobe revelando o site por baixo */
export const overlayVariants: Variants = {
  hidden: { clipPath: OPEN },
  visible: { clipPath: OPEN },
  exit: {
    clipPath: CLOSED,
    transition: { duration: 0.9, delay: 0.25, ease: EASE },
  },
};

/* Conteúdo (xícara + texto): recua antes de a cortina subir */
export const contentVariants: Variants = {
  hidden: { opacity: 1, scale: 1, y: 0 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -16,
    transition: { duration: 0.45, ease: EASE },
  },
};

/* Marca de café ao fundo: pulsa em escala e opacidade */
export const stainVariants: Variants = {
  hidden: { opacity: 0.1, scale: 1 },
  visible: {
    opacity: [0.1, 0.2, 0.1],
    scale: [1, 1.06, 1],
    transition: { duration: 4.8, ease: "easeInOut", repeat: Infinity },
  },
};

/* Grupo do vapor: só escalona o início de cada fio (staggerChildren) */
export const steamGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.45 } },
};

/* Cada fio: é "desenhado" subindo e se dissipa, em loop */
export const steamVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0, y: 8 },
  visible: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.9, 0],
    y: [8, 0, -8],
    transition: {
      duration: 2.6,
      ease: EASE,
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 0.2,
    },
  },
};

/* Frases: sobe ao entrar e sobe ao sair */
export const phraseVariants: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  leave: { opacity: 0, y: -14, transition: { duration: 0.4, ease: EASE } },
};