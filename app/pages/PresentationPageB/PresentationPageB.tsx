"use client";

import { MotionConfig } from "framer-motion";
import * as S from "./PresentationPageBStyled";
import Image from "next/image";
import Title from "@/app/component/Title/Title";
import Text from "@/app/component/Text/Text";
import Button from "@/app/component/Button/Button";
import {
  clipDown,
  clipLeft,
  clipUp,
  fadeIn,
  fadeUp,
  floatIn,
  inView,
  popStar,
  ringIn,
  stagger,
  taglineWipe,
} from "@/app/pages/animations";

const IMG = "/NewImgs/PresentationPageB";

/* Definido fora do componente para não recriar o objeto a cada render */
const taglineStagger = stagger(0.2, 0.25);

export default function PresentationPageB() {
  const year = new Date().getFullYear();

  return (
    <MotionConfig reducedMotion="user">
      <S.PresentationPageBContainer>
        {/* ───────── Seção 1: Seu momento de pausa ───────── */}
        <S.Section>
          <S.Stage $ratio="1920 / 864" $padding="4.5rem 1rem 1.75rem">
            <S.Picture>
              <source media="(max-width: 1200px)" srcSet={`${IMG}/img1Mobile.png`} />
              <S.ImgRoom
                variants={clipLeft}
                {...inView(0)}
                src={`${IMG}/img1.png`}
                alt="Salão da cafeteria com mesas e cadeiras de madeira"
              />
            </S.Picture>

            <S.LatteA
              variants={floatIn}
              {...inView(0.7)}
              src="/NewImgs/CoffeMilk.svg"
              alt=""
              aria-hidden="true"
            />
            <S.StainA
              variants={ringIn}
              {...inView(0.3)}
              src="/NewImgs/VetorMarcaCaf%C3%A9B.png"
              alt=""
              aria-hidden="true"
            />

            <S.TextBlock $left="5.21%" $top="24.6%" $width="25.5%">
              <S.Copy variants={fadeUp} {...inView(0.2)} $text="0.73cqw">
                <Title as="h2">
                  Seu momento
                  <br />
                  de pausa
                </Title>
                <Text>
                  Ambiente intimista, silencioso e acolhedor, planejado para você desacelerar.
                  <br />
                  Luz baixa e conforto pensado unicamente para deixar seu momento incrível.
                </Text>
              </S.Copy>

              <S.ButtonRow variants={fadeUp} {...inView(0.4)}>
                <Button text="Entrar em contato" />
                <S.HideOnMobile>
                  <Button text="Fazer reserva" />
                </S.HideOnMobile>
              </S.ButtonRow>
            </S.TextBlock>
          </S.Stage>
        </S.Section>

        {/* ───────── Seção 2: Para seu evento ───────── */}
        <S.Section>
          <S.Stage $ratio="1920 / 876" $padding="7rem 1.9rem 2.5rem 1.4rem">
            <S.EventGroup>
              {/* só desktop */}
              <S.ImgFlower
                variants={clipDown}
                {...inView(0.15)}
                src={`${IMG}/img2.png`}
                alt="Bolo decorado com flores"
                loading="lazy"
              />

              {/* desktop: img3 · mobile: img2Mobile */}
              <S.Picture>
                <source media="(max-width: 1200px)" srcSet={`${IMG}/img2Mobile.png`} />
                <S.ImgCakes
                  variants={clipUp}
                  {...inView(0.3)}
                  src={`${IMG}/img3.png`}
                  alt="Mesa de bolos decorados com flores"
                />
              </S.Picture>

              <S.Star
                variants={popStar}
                {...inView(0.8)}
                src="/NewImgs/PresentationPage/Star.png"
                alt=""
                aria-hidden="true"
              />

              <S.TextBlock $left="48.96%" $top="16%" $width="37.5%">
                <S.Copy variants={fadeUp} {...inView(0.2)} $text="1.15cqw" $end>
                  <Title as="h2">Para seu evento</Title>
                  <Text>
                    Leve a experiência da nossa confeitaria para a sua comemoração.
                    <br />
                    Produção artesanal, ingredientes selecionados e receitas exclusivas feitas
                    sob medida para o seu evento.
                  </Text>
                </S.Copy>
                <S.ButtonSlot variants={fadeUp} {...inView(0.4)} $gap="1.4cqw">
                  <Button text="Entrar em contato" />
                </S.ButtonSlot>
              </S.TextBlock>
            </S.EventGroup>
          </S.Stage>
        </S.Section>

        {/* ───────── Seção 3: Contato ───────── */}
        <S.Section>
          <S.Stage $ratio="1920 / 759" $padding="2rem 1.2rem 3rem">
            <S.StainC
              variants={ringIn}
              {...inView(0.2)}
              src="/NewImgs/VetorMarcaCaf%C3%A9B.png"
              alt=""
              aria-hidden="true"
            />

            {/* o pai dispara o observer; ícone e texto entram em sequência */}
            <S.Tagline variants={taglineStagger} {...inView()}>
              <S.TaglineIcon
                variants={floatIn}
                src="/NewImgs/CoffeMilk.svg"
                alt=""
                aria-hidden="true"
              />
              <S.TaglineText variants={taglineWipe}>Te esperamos ansiosos</S.TaglineText>
            </S.Tagline>

            <S.TextBlock $left="5.57%" $top="21.7%" $width="55%">
              <S.Copy variants={fadeUp} {...inView(0.1)} $text="1.04cqw">
                <Title as="h2">Ficou com alguma dúvida?</Title>
                <p className="font-abel">
                  Entre em contato conosco para encomendar seu bolo, reservar uma mesa ou tirar
                  dúvidas sobre o cardápio.
                </p>
                <S.Address className="font-abel">
                  <Image
                    src="/NewImgs/mapIcon.svg"
                    alt=""
                    aria-hidden="true"
                    width="18"
                    height="18"
                    style={{ verticalAlign: "-2px" }}
                  />
                  Rua dos Cafezais, 100 — Bairro Alto, SP
                </S.Address>
              </S.Copy>
              <S.ButtonSlot variants={fadeUp} {...inView(0.3)} $gap="1.6cqw">
                <Button text="Entrar em contato" />
              </S.ButtonSlot>
            </S.TextBlock>
          </S.Stage>
        </S.Section>

        <S.Footer variants={fadeIn} {...inView(0.1)}>
          © {year} Cafeteria. Todos os direitos reservados.
        </S.Footer>
      </S.PresentationPageBContainer>
    </MotionConfig>
  );
}