"use client";

import * as S from "./PresentationPageStyled";
import Title from "@/app/component/Title/Title";
import Text from "@/app/component/Text/Text";
import Button from "@/app/component/Button/Button";

export default function PresentationPage() {
  return (
    <S.PresentationPageContainer>
      <S.Stage>
        <S.Star src="/NewImgs/PresentationPage/Star.png" alt="" aria-hidden="true" />

        <S.CakesGroup>
          <S.ImgCakes src="/NewImgs/PresentationPage/img1.png" alt="Fatias de bolo sobre a mesa" />

          <S.TextBlock $left="34.9%" $top="7.08%" $width="38.5%">
            <S.Copy>
              <Title as="h2">Seu novo bolo favorito</Title>
              <Text>
                Massa leve, fresca e molhada com recheio cremoso.
                <br />
                Cada bolo é preparado diariamente na nossa cozinha, combinando técnicas da
                confeitaria com os melhores ingredientes.
              </Text>
            </S.Copy>
            <S.ButtonSlot>
              <Button text="Ver cardápio" />
            </S.ButtonSlot>
          </S.TextBlock>
        </S.CakesGroup>

        <S.CoffeeGroup>
          <S.ImgCoffee src="/NewImgs/PresentationPage/img2.png" alt="Café servido na cafeteria" />

          <S.CoffeeRing src="/NewImgs/VetorMarcaCaf%C3%A9.svg" alt="" aria-hidden="true" />

          <S.TextBlock $left="57.5%" $top="40.7%" $width="38.3%">
            <S.Copy>
              <Title as="h2">NOSSA CAFETERIA</Title>
              <Text>
                Grãos 100% Arábica de fazendas brasileiras, moídos na hora e com torra fresca.
                <br />
                Extraímos desde o espresso encorpado até métodos filtrados e bebidas autorais
                geladas, garantindo uma xícara equilibrada, aromática e sem amargor.
              </Text>
            </S.Copy>
            <S.ButtonSlot $spaced>
              <Button text="Fazer reserva" />
            </S.ButtonSlot>
          </S.TextBlock>
        </S.CoffeeGroup>
      </S.Stage>
    </S.PresentationPageContainer>
  );
}