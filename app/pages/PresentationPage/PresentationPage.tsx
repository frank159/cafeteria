"use client";

import { MotionConfig } from "framer-motion";
import * as S from "./PresentationPageStyled";
import Title from "@/app/component/Title/Title";
import Text from "@/app/component/Text/Text";
import Button from "@/app/component/Button/Button";
import { clipDown, clipUp, DELAY, fadeUp, inViewIn, popStar, ringIn } from "@/app/pages/animations";
import ProjectModal from "@/app/component/ProjectCard/ProjectModal";
import { useState } from "react";

export default function PresentationPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <S.PresentationPageContainer id="bolos-e-cafes">
        <S.Stage>
          <S.Star variants={popStar} {...inViewIn("cakes", DELAY.accent)}
            src="/NewImgs/PresentationPage/Star.png"
            alt=""
            aria-hidden="true"
          />

          <S.CakesGroup>
            <S.ImgCakes variants={clipDown} {...inViewIn("cakes", DELAY.base)}
              src="/NewImgs/PresentationPage/img1.png"
              alt="Fatias de bolo sobre a mesa"
            />

            <S.TextBlock $left="34.9%" $top="7.08%" $width="38.5%">
              <S.Copy variants={fadeUp} {...inViewIn("cakes", DELAY.copy)}>
                <Title as="h2">Seu novo bolo favorito</Title>
                <Text>
                  Massa leve, fresca e molhada com recheio cremoso.
                  <br />
                  Cada bolo é preparado diariamente na nossa cozinha, combinando técnicas da
                  confeitaria com os melhores ingredientes.
                </Text>
              </S.Copy>
              <S.ButtonSlot variants={fadeUp} {...inViewIn("cakes", DELAY.button)}>
                <Button onClick={() => setMenuOpen(true)} text="Ver cardápio" />
              </S.ButtonSlot>
            </S.TextBlock>
          </S.CakesGroup>

          <S.CoffeeGroup>
            <S.ImgCoffee variants={clipUp} {...inViewIn("coffee", DELAY.image)}
              src="/NewImgs/PresentationPage/img2.png"
              alt="Café servido na cafeteria"
            />

            <S.CoffeeRing variants={ringIn} {...inViewIn("coffee", DELAY.accent)}
              src="/NewImgs/VetorMarcaCaf%C3%A9.svg"
              alt=""
              aria-hidden="true"
            />

            <S.TextBlock $left="57.5%" $top="40.7%" $width="38.3%">
              <S.Copy variants={fadeUp} {...inViewIn("coffee", DELAY.baseA)}>
                <Title as="h2">NOSSA CAFETERIA</Title>
                <Text>
                  Grãos 100% Arábica de fazendas brasileiras, moídos na hora e com torra
                  fresca.
                  <br />
                  Extraímos desde o espresso encorpado até métodos filtrados e bebidas
                  autorais geladas, garantindo uma xícara equilibrada, aromática e sem
                  amargor.
                </Text>
              </S.Copy>
              <S.ButtonSlot $spaced variants={fadeUp} {...inViewIn("coffee", DELAY.button)}>
                <Button
                  href='https://wa.me/5541996262562?text=Olá!%20Gostaria%20de%20mais%20informações.'
                  target="_blank"
                  text="Fazer reserva" />
              </S.ButtonSlot>
            </S.TextBlock>
          </S.CoffeeGroup>
        </S.Stage>
      </S.PresentationPageContainer>
      <ProjectModal
        open={menuOpen}
        name="Carta de drinks"
        images={["/imgs/cardapio/cardapio.jpg"]}
        fitToViewport
        onClose={() => setMenuOpen(false)}
      />
    </MotionConfig>
  );
}