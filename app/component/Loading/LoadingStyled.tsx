import { m } from "framer-motion";
import { styled } from "styled-components";

/* Todos usam `m` (e não `motion`) porque o Loading roda dentro de LazyMotion. */

/* Tela cheia, fundo liso: já está na tela desde o primeiro pixel. */
export const Overlay = styled(m.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-color: #3d1c14;
  will-change: opacity;
`;

/* Conteúdo: é ele que faz a entrada (opacity + transform) */
export const Content = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
`;

export const PotSvg = styled.svg`
  display: block;
  width: clamp(160px, 36vw, 250px);
  height: auto;
  overflow: visible;
`;

/* Vapor: só transform e opacity. A escala parte da base do fio (o bico). */
export const Steam = styled(m.path)`
  fill: none;
  stroke: #e9e2cf;
  stroke-width: 3;
  stroke-linecap: round;
  transform-box: fill-box;
  transform-origin: 50% 100%;
  will-change: transform, opacity;
`;

/* Chama: a escala parte da base, que fica sobre a boca do fogareiro */
export const Flame = styled(m.g)`
  transform-box: fill-box;
  transform-origin: 50% 100%;
  will-change: transform, opacity;
`;