import { motion } from "framer-motion";
import { styled, css } from "styled-components";

export const CoffeeRing = styled(motion.img)`
  position: absolute;
  left: 4em;
  top: 0.6em;
  width: 4.2em;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: -1;

  @media (max-width: 768px) {
    display: none;
  }

`;

export const TitleLine = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
`;

export const TitleLineInner = styled(motion.span)`
  display: block;
`;

export const ButtonItem = styled(motion.div)``;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
`;

export const ActionButton = styled.a<{ $hideOnMobile?: boolean }>`
  padding: 0.35rem 0.7rem;
  border: none;
  border-radius: 2px;
  background: #5a2218;
  color: #b9c7da;
  cursor: pointer;
  font-family: var(--font-bona-nova-sc), serif;
  font-size: 16px;
  letter-spacing: 0.03em;
  font-variant: small-caps;
  white-space: nowrap;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #74301f;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 0.8rem;
  }

  ${(p) =>
    p.$hideOnMobile &&
    css`
      @media (max-width: 768px) {
        display: none;
      }
    `}
`;

export const HomeCardTagline = styled(motion.span)`
  position: absolute;
  top: 29%;
  left: 79.5%;
  width: 11rem;
  z-index: 2;
  font-family: var(--font-caveat), cursive;
  font-size: 32px;
  line-height: 1.25;
  color: #A4B9CE;
  rotate: -5deg;

  @media (max-width: 1024px) {
    left: auto;
    right: 1.5rem;
    top: 14%;
    width: 8rem;
  }

  @media (max-width: 768px) {
    position: static;
    align-self: flex-start;
    margin: auto 0 18vh 2.2rem;
    width: 10rem;
    font-size: 24px;
  }
`;

export const HomeCardContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  height: auto;
  box-sizing: border-box;
  /* corta só o excesso lateral (animações), nunca o conteúdo na vertical */
  overflow-x: clip;
  overflow-y: visible;

  background-color: #050608;
  background-image: url("/NewImgs/BannerHeroSection.png");
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    background-image: url("/NewImgs/BannerHeroSectionMobile.png");
  }
`;

export const HomeCardContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;
  /* topo proporcional à altura da tela + respiro embaixo */
  padding: clamp(8rem, 26vh, 17.5rem) 1rem 3rem 4rem;

  @media (max-width: 1024px) {
    padding: clamp(7rem, 20vh, 12rem) 1rem 3rem 3rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 7rem 1rem 2rem;
  }
`;

export const HomeCardTitleWrapper = styled.div`
  position: relative;
  /* 64px no desktop, reduz suavemente em telas menores */
  font-size: clamp(36px, 5.4vw, 64px);
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HomeCardDescription = styled(motion.div)`
  margin: 0 0 2.4rem;
  max-width: 340px;

  @media (max-width: 768px) {
    max-width: 11.5rem;
    margin-bottom: 1rem;
  }
`;