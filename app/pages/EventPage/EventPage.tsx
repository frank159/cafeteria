"use client";

import * as S from "./EventPageStyled";
import TextCord from "@/app/component/TextCord/TextCord";
import Button from "@/app/component/Button/Button";

export default function EventPage() {

    return (
        <S.EventPageContainer>
            <S.TextContainer>
                <TextCord
                    titleAlign="right"
                    descriptionAlign="right"

                    width="30%"
                    Title="PARA SEU EVENTO"
                    Description="Leve a experiência da nossa confeitaria para a sua comemoração. Produção artesanal, ingredientes selecionados e receitas exclusivas feitas sob medida para o seu evento."
                />
                <div style={{ marginTop: "1rem", zIndex: 999 }}>
                    <Button text="Fazer Encomenda" />
                </div>
            </S.TextContainer>
            <S.TextContainerB>
                <TextCord
                    titleAlign="left"
                    descriptionAlign="left"

                    width="70%"
                    Title="FICOU COM ALGUMA DÚVIDA?"
                    Description="Entre em contato conosco para encomendar seu bolo, reservar uma mesa ou tirar dúvidas sobre o cardápio."
                    Extra="Rua dos Cafezais, 100 — Bairro Alto, SP"
                />
            </S.TextContainerB>

        </S.EventPageContainer>
    );
}