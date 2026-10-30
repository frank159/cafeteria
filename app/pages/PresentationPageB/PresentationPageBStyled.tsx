import { styled, css } from "styled-components";
import Text from "@/app/component/Text/Text";

/*
  Desktop (> 1200px): frame de 1920px, tudo em % do frame. Título e texto escalam
  com o frame (cqw), então a composição não quebra em larguras intermediárias.
  Até 1200px: coluna única seguindo a referência mobile.
*/
const desktop = "@media (min-width: 1201px)";
const mobile = "@media (max-width: 1200px)";

export const PresentationPageBContainer = styled.section`
  width: 100%;
  background-color: #3d1c14;
  overflow: hidden;
`;

/* No mobile é o Section (e não o Stage) que ancora imagem de fundo e manchas */
export const Section = styled.section`
  position: relative;
  width: 100%;
`;

export const Stage = styled.div<{ $ratio: string; $padding: string }>`
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  aspect-ratio: ${(p) => p.$ratio};

  ${desktop} {
    container-type: inline-size;
  }

  ${mobile} {
    position: static;
    aspect-ratio: auto;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    padding: ${(p) => p.$padding};
    box-sizing: border-box;
  }
`;

export const Picture = styled.picture`
  display: contents;
`;

/* ───────── Seção 1 ───────── */

/* img1: x812 y123 1014x601 · mobile: vira fundo da seção inteira */
export const ImgRoom = styled.img`
  position: absolute;
  left: 42.29%;
  top: 14.24%;
  width: 52.76%;
  aspect-ratio: 1014 / 601;
  object-fit: cover;
  z-index: 2;

  ${mobile} {
    inset: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
    object-position: center;
    z-index: 0;
  }
`;

/* Ícone de café com leite no canto da foto */
export const LatteA = styled.img`
  position: absolute;
  left: 88.54%;
  top: 7.52%;
  width: 3.7%;
  height: auto;
  z-index: 3;
  pointer-events: none;
  user-select: none;

  ${mobile} {
    display: none;
  }
`;

const stainBase = css`
  position: absolute;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: 1;
`;

/* Mancha da seção 1: x437 y424 220px */
export const StainA = styled.img`
  ${stainBase}
  left: 22.76%;
  top: 49.07%;
  width: 11.46%;

  ${mobile} {
    left: auto;
    top: auto;
    right: 6%;
    bottom: -40px; /* vaza um pouco para fora da seção, como na referência */
    width: clamp(90px, 26%, 140px);
    z-index: 2;
  }
`;

/* ───────── Blocos de texto ───────── */

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

  /* mobile: Copy e botões viram itens do flex/grid da seção */
  ${mobile} {
    display: contents;
  }
`;

/* Título + texto. $text = tamanho do texto no frame de 1920px (em cqw) */
export const Copy = styled.div<{ $text: string; $end?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;

  ${desktop} {
    h2 {
      font-size: 3.333cqw; /* 64px no frame de 1920 */
      line-height: 1.08;
      white-space: nowrap;
    }

    /* > :not(h2) {
      font-size: max(12px, ${(p) => p.$text});
    } */
  }

  ${mobile} {
    grid-area: copy;
    position: relative;
    z-index: 3;
    gap: 0.6rem;

    h2 {
      font-size: 2rem;
      line-height: 1.1;
    }

    ${(p) =>
    p.$end &&
    css`
        align-items: flex-end;
        text-align: right;
      `}
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
  margin-top: 0.8cqw;

  ${mobile} {
    margin-top: 1.25rem;
    position: relative;
    z-index: 3;
  }
`;

/* "Fazer reserva" some no mobile */
export const HideOnMobile = styled.div`
  display: contents;

  ${mobile} {
    display: none;
  }
`;

export const ButtonSlot = styled.div<{ $gap?: string }>`
  display: flex;
  margin-top: ${(p) => p.$gap ?? "0"};

  ${mobile} {
    margin-top: 0.5rem;
    position: relative;
    z-index: 5;
  }
`;

/* ───────── Seção 2 ───────── */

/* Estrela: x390 y608 180px */
export const Star = styled.img`
  position: absolute;
  left: 20.31%;
  top: 69.41%;
  width: 9.38%;
  height: auto;
  z-index: 1;
  pointer-events: none;
  user-select: none;

  /* mobile: no canto inferior esquerdo da foto, por cima dela */
  ${mobile} {
    position: static;
    grid-area: media;
    justify-self: start;
    align-self: end;
    width: 70px;
    margin: 0 0 -25px 18px;
    z-index: 6;
  }
`;

/* img2 (bolo com flores): x296 y138 618x370 – só desktop, fica por cima da img3 */
export const ImgFlower = styled.img`
  position: absolute;
  left: 15.42%;
  top: 15.75%;
  width: 32.19%;
  aspect-ratio: 618 / 370;
  object-fit: cover;
  z-index: 3;

  ${mobile} {
    display: none;
  }
`;

/* img3 (três bolos): x717 y432 763x406 · mobile: img2Mobile 285x120 */
export const ImgCakes = styled.img`
  position: absolute;
  left: 37.34%;
  top: 49.32%;
  width: 39.74%;
  aspect-ratio: 763 / 406;
  object-fit: cover;
  z-index: 2;

  ${mobile} {
    position: static;
    grid-area: media;
    justify-self: end;
    width: 84%;
    aspect-ratio: 285 / 120;
    z-index: 1;
  }
`;

/* Desktop: sem caixa própria (posições absolutas no Stage).
   Mobile: texto em cima; imagem embaixo com botão (esq.) e estrela sobrepostos */
export const EventGroup = styled.div`
  display: contents;
  
  ${mobile} {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
    "copy"
    "media";
    row-gap: 1.3rem;
    align-items: start;
    
    ${ButtonSlot} {
      grid-area: media;
      justify-self: start;
      align-self: start;
      margin-top: 42px;
      @media (max-width: 468px) {
        margin-top: 12px;
    
    }
    }
  }


`;

/* ───────── Seção 3 ───────── */

/* Mancha da seção 3: x935 y258 203px */
export const StainC = styled.img`
  ${stainBase}
  left: 48.7%;
  top: 34%;
  width: 17%;

  ${mobile} {
    left: auto;
    top: auto;
    right: 8%;
    bottom: 1rem;
    width: clamp(100px, 30%, 160px);
  }
`;

/* "Te esperamos ansiosos" com o ícone em cima (ícone só no desktop) */
export const Tagline = styled.div`
  position: absolute;
  left: 80.9%;
  top: 27.7%;
  width: 9.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3cqw;
  z-index: 3;

  ${mobile} {
    position: static;
    width: auto;
    align-self: flex-end;
    margin: 0 2.1rem 1.9rem 0;
  }
`;

export const TaglineIcon = styled.img`
  width: max(48px, 2.24cqw);
  height: auto;
  rotate: -5deg;
  margin-left: 2rem;

  ${mobile} {
    display: none;
  }
`;

export const TaglineText = styled.span`
  font-family: var(--font-caveat), cursive;
  font-size: max(18px, 1.56cqw);
  line-height: 1.27;
  text-align: center;
  color: #a4b9ce;
  rotate: 5deg;

  ${mobile} {
    width: 6rem;
    font-size: 15px;
  }
`;

/* Endereço com ícone de pin: colado no parágrafo no desktop, com respiro no mobile */
export const Address = styled.div`
  display: flex;
  flex-direction: row;
  && {
    margin-top: -9px;
  }

  ${mobile} {
    && {
      margin-top: 0.9rem;
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;
  box-sizing: border-box;
  padding: 1.4rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.55);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  color: #fff;
`;