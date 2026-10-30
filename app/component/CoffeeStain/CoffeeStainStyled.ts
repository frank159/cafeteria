import { motion } from "framer-motion";
import { styled } from "styled-components";

/* Camada absoluta: posicione pelos props, sem interferir nos cliques */
export const Wrapper = styled.div<{
  $top: string;
  $left: string;
  $width: string;
  $z: number;
}>`
  position: absolute;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  width: ${(p) => p.$width};
  z-index: ${(p) => p.$z};
  aspect-ratio: 1;
  pointer-events: none;
  user-select: none;
`;

/* A mancha. will-change só em transform/opacity/clip-path (baratos de animar) */
export const Stain = styled(motion.img)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  will-change: transform, opacity, clip-path;
`;