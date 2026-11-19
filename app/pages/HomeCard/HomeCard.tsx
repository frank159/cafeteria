"use client";

import { MotionConfig } from "framer-motion";
import * as S from "./HomeCardStyled";
import Title from "@/app/component/Title/Title";
import Text from "@/app/component/Text/Text";
import { fadeUp, HERO, heroStagger, lineUp, MOTION_CONFIG, onLoad, ringIn, taglineWipe } from "@/app/pages/animations";
import ProjectModal from "@/app/component/ProjectCard/ProjectModal";
import { useState } from "react";

const TITLE_LINES = ["Conversa boa,", "Sabor doce,", "Café quente"];

export default function HomeCard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionConfig {...MOTION_CONFIG}>
      <S.HomeCardContainer id="home">
        <S.HomeCardContent variants={heroStagger} {...onLoad()}>
          <S.HomeCardTitleWrapper>
            <Title>
              {TITLE_LINES.map((line) => (
                <S.TitleLine key={line}>
                  <S.TitleLineInner variants={lineUp}>{line}</S.TitleLineInner>
                </S.TitleLine>
              ))}
            </Title>
            <S.CoffeeRing
              variants={ringIn}
              src="/NewImgs/VetorMarcaCaf%C3%A9.svg"
              alt=""
              aria-hidden="true"
            />
          </S.HomeCardTitleWrapper>

          <S.HomeCardDescription variants={fadeUp}>
            <Text>
              Cafés especiais extraídos na hora, receitas artesanais com ingredientes
              selecionados e bolos exclusivos para acompanhar sua tarde <br/>ou o seu evento.
            </Text>
          </S.HomeCardDescription>

          <S.ButtonContainer>
            <S.ButtonItem variants={fadeUp}>
              <S.ActionButton
                href='https://wa.me/5541996262562?text=Olá!%20Gostaria%20de%20mais%20informações.'
                target="_blank"
                rel="noopener noreferrer"
              >Fazer reserva</S.ActionButton>
            </S.ButtonItem>
            <S.ButtonItem variants={fadeUp}>
              <S.ActionButton
                className="home-card-menu-button"
                onClick={() => setMenuOpen(true)}
                type="button"
              >
                Ver cardápio
              </S.ActionButton>
            </S.ButtonItem>
          </S.ButtonContainer>
        </S.HomeCardContent>

        <S.HomeCardTagline variants={taglineWipe} {...onLoad(HERO.tagline)}>
          Seu momento de descanso
        </S.HomeCardTagline>
      </S.HomeCardContainer>
      <ProjectModal
        open={menuOpen}
        name="Carta de drinks"
        images={["/imgs/cardapio/cardapio.jpg"]}
        fitToViewport
        onClose={() => setMenuOpen(false)}
      />
      <style jsx global>{`
        @media (max-width: 767px) {
          .home-card-menu-button {
            display: none;
          }
        }
      `}</style>
    </MotionConfig>
  );
}