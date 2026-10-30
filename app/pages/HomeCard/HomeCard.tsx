"use client";

import * as S from "./HomeCardStyled";
import Title from "@/app/component/Title/Title";
import Text from "@/app/component/Text/Text";

export default function HomeCard() {
  return (
    <S.HomeCardContainer>
      <S.HomeCardContent>
        <S.HomeCardTitleWrapper>
          <Title>
            Conversa boa,
            <br />
            Sabor doce,
            <br />
            Café quente
          </Title>
          <S.CoffeeRing src="/NewImgs/VetorMarcaCaf%C3%A9.svg" alt="" aria-hidden="true" />
        </S.HomeCardTitleWrapper>

        <S.HomeCardDescription>
          <Text>
            Cafés especiais extraídos na hora, receitas artesanais com ingredientes
            selecionados e bolos exclusivos para acompanhar sua tarde ou o seu evento.
          </Text>
        </S.HomeCardDescription>

        <S.ButtonContainer>
          <S.ActionButton type="button">Fazer reserva</S.ActionButton>
          <S.ActionButton type="button" $hideOnMobile>
            Ver cardápio
          </S.ActionButton>
        </S.ButtonContainer>
      </S.HomeCardContent>

      <S.HomeCardTagline>Seu momento de descanso</S.HomeCardTagline>
    </S.HomeCardContainer>
  );
}