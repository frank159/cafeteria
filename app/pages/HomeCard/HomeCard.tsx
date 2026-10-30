"use client";

import { MotionConfig } from "framer-motion";
import * as S from "./HomeCardStyled";
import Title from "@/app/component/Title/Title";
import Text from "@/app/component/Text/Text";
import { fadeUp, lineUp, ringIn, stagger, taglineWipe } from "@/app/pages/animations";

const content = stagger(0.15, 0.1);
const TITLE_LINES = ["Conversa boa,", "Sabor doce,", "Café quente"];

export default function HomeCard() {
  return (
    <MotionConfig reducedMotion="user">
      <S.HomeCardContainer>
        <S.HomeCardContent variants={content} initial="hidden" animate="visible">
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
              selecionados e bolos exclusivos para acompanhar sua tarde ou o seu evento.
            </Text>
          </S.HomeCardDescription>

          <S.ButtonContainer>
            <S.ButtonItem variants={fadeUp}>
              <S.ActionButton type="button">Fazer reserva</S.ActionButton>
            </S.ButtonItem>
            <S.ButtonItem variants={fadeUp}>
              <S.ActionButton type="button" $hideOnMobile>
                Ver cardápio
              </S.ActionButton>
            </S.ButtonItem>
          </S.ButtonContainer>
        </S.HomeCardContent>

        <S.HomeCardTagline
          variants={taglineWipe}
          initial="hidden"
          animate="visible"
          custom={1.1}
        >
          Seu momento de descanso
        </S.HomeCardTagline>
      </S.HomeCardContainer>
    </MotionConfig>
  );
}