"use client";

import { useEffect, useState, type MouseEvent } from "react";
import * as S from "./HeaderStyled";
import Image from "next/image";

const links = [
    { label: "HOME", id: "home" },
    { label: "BOLOS E CAFÉS", id: "bolos-e-cafes" },
    { label: "NOSSOS ESPAÇOS", id: "espacos" },
    { label: "EVENTOS", id: "eventos" },
    { label: "CONTATO", id: "contato" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        handleScroll(); // cobre o caso de a página carregar já rolada
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block: "start",
        });
    };

    return (
        <S.HeaderStyled $isScrolled={isScrolled}>
            <a href="#home" onClick={scrollTo("home")} aria-label="Página inicial">
                <Image
                    src="/imgs/LogoHeader.png"
                    alt="Logo da cafeteria"
                    width={150}
                    height={50}
                    style={{ marginLeft: "1rem" }}
                />
            </a>

            <S.ButtonSection>
                {links.map(({ label, id }) => (
                    <S.ButtonHeaderStyled
                        as="a"
                        href={`#${id}`}
                        onClick={scrollTo(id)}
                        key={id}
                    >
                        {label}
                    </S.ButtonHeaderStyled>
                ))}
            </S.ButtonSection>
        </S.HeaderStyled>
    );
}
