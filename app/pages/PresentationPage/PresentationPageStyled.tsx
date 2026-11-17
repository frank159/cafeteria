import { motion } from "framer-motion";
import { styled } from "styled-components";

export const PresentationPageContainer = styled.section`
  width: 100%;
  background-color: #3d1c14;
  overflow: hidden;
  padding-top: 10vh;

  @media (max-width: 1200px) {
    padding-top: 0;
  }
`;

export const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  aspect-ratio: 1920 / 904;
  overflow: hidden;

  @media (min-width: 1201px) {
    container-type: inline-size;
  }

  @media (max-width: 1200px) {
    aspect-ratio: auto;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    padding: 4.5rem 1rem 4rem;
    box-sizing: border-box;
  }
`;

export const Star = styled(motion.img)`
  position: absolute;
  left: 86.9%;
  top: -1.4%;
  width: 9.2%;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: 1;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const ButtonSlot = styled(motion.div) <{ $spaced?: boolean }>`
  display: flex;
  margin-top: ${(p) => (p.$spaced ? "16px" : "0")};

  @media (max-width: 1200px) {
    margin-top: 0;
    z-index: 5; 

    && > * {
      padding: 10px;
    }
  }
`;

export const Copy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;

  @media (min-width: 1201px) {
    h2 {
      font-size: clamp(32px, 3.333cqw, 64px);
    }

    > :not(h2) {
      font-size: clamp(14px, 0.833cqw, 16px);
    }
  }

  @media (max-width: 1200px) {
    grid-area: copy;
    gap: 0.6rem;
  }
`;

export const TextBlock = styled.div<{ $left: string; $top: string; $width: string }>`
  position: absolute;
  left: ${(p) => p.$left};
  top: ${(p) => p.$top};
  width: ${(p) => p.$width};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  z-index: 4;

  @media (max-width: 1200px) {
    display: contents;
  }
`;

export const CakesGroup = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none; 
  @media (max-width: 1200px) {
    position: static;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "copy"
      "media";
    row-gap: 1.25rem;
    align-items: start;
    pointer-events: auto;

    ${ButtonSlot} {
      grid-area: media;
      justify-self: start;
    }
  }
`;

export const CoffeeGroup = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  @media (max-width: 1200px) {
    position: static;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "copy"
      "media";
    row-gap: 1.2rem;
    align-items: start;
    pointer-events: auto;

    ${ButtonSlot} {
      grid-area: media;
      justify-self: end;
      margin-top: 28px;
      margin-right: 7px;
    }
  }
`;

export const ImgCakes = styled(motion.img)`
position: absolute;
  left: 5.208%;
  top: 5.86%;
  width: 27.86%;
  aspect-ratio: 535 / 638;
  object-fit: cover;
  object-position: right;
  z-index: 3;

  @media (max-width: 1200px) {
    position: static;
    grid-area: media;
    justify-self: end;
    width: calc(100% - 109px);
    aspect-ratio: 252 / 117;
    margin: 13px 8px 0 0;
    object-position: center 62%;
    transform: scaleX(-1);
  }
`;

export const ImgCoffee = styled(motion.img)`
  position: absolute;
  left: 25%;
  top: 39.27%;
  width: 30.78%;
  aspect-ratio: 591 / 395;
  object-fit: cover;
  object-position: center;
  z-index: 2;

  @media (max-width: 1200px) {
    position: static;
    grid-area: media;
    justify-self: start;
    width: 87%;
    aspect-ratio: 315 / 120;
    object-position: center 92%;
    transform: scaleX(-1);
  }
`;

export const OutlineButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  padding: 9px 10px;
  border: 1px solid #a9bdd6;
  background: transparent;
  color: #a9bdd6;
  font-family: var(--font-bona-nova-sc), serif;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.03em;
  font-variant: small-caps;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(169, 189, 214, 0.12);
  }

  @media (max-width: 1200px) {
    margin-top: 12px;
  }
`;

export const CoffeeRing = styled(motion.img)`
  position: absolute;
  left: 62.28%;
  top: 52%;
  width: 14%;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: 1;

  @media (max-width: 1200px) {
    display: none;
  }
`;