"use client";

import { useState, useEffect } from "react";
import * as S from "./EventPageStyled";
import TextCord from "@/app/component/TextCord/TextCord";
import Button from "@/app/component/Button/Button";

export default function EventPage() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Função para checar se a tela é mobile (ex: menor que 767)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        // Executa ao carregar a página
        handleResize();

        // Ouve o evento de redimensionamento da tela
        window.addEventListener("resize", handleResize);

        // Limpa o evento ao desmontar o componente
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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