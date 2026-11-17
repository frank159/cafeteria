"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import * as S from "./HeaderStyled";
import Image from "next/image";

const links = [
    { label: "HOME", id: "home" },
    { label: "BOLOS E CAFÉS", id: "bolos-e-cafes" },
    { label: "NOSSOS ESPAÇOS", id: "espacos" },
    { label: "EVENTOS", id: "eventos" },
    { label: "CONTATO", id: "contato" },
];

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "start",
    });
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        handleScroll(); // cobre o caso de a página carregar já rolada
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fecha com ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Trava o scroll da página enquanto o menu está aberto
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Fecha ao passar para o breakpoint desktop
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const scrollTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        scrollToSection(id);
    };

    // No mobile: fecha o menu e rola logo depois, já com o scroll liberado
    const scrollToAndClose = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        close();
        window.setTimeout(() => scrollToSection(id), 120);
    };

    return (
        <S.HeaderStyled
            $isScrolled={isScrolled || open}
            style={{ "--count": links.length } as CSSProperties}
        >
            <a
                href="#home"
                onClick={(e) => {
                    scrollTo("home")(e);
                    close();
                }}
                aria-label="Página inicial"
            >
                <Image
                    src="/imgs/LogoHeader.png"
                    alt="Logo da cafeteria"
                    width={150}
                    height={50}
                    style={{ marginLeft: "1rem" }}
                />
            </a>

            {/* Navegação desktop */}
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

            {/* Botão sanduíche (só mobile/tablet) */}
            <S.BurgerButton
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
            >
                <S.BurgerIcon $open={open} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </S.BurgerIcon>
            </S.BurgerButton>

            {/* Menu mobile */}
            <S.Backdrop $open={open} aria-hidden="true" onClick={close} />

            <S.MobileMenu id="mobile-menu" $open={open} aria-label="Menu principal">
                <S.MobileList>
                    {links.map(({ label, id }, i) => (
                        <S.MobileItem
                            key={id}
                            $open={open}
                            style={{ "--i": i } as CSSProperties}
                        >
                            <S.MobileLink href={`#${id}`} onClick={scrollToAndClose(id)}>
                                {label}
                                <S.MobileIndex>{String(i + 1).padStart(2, "0")}</S.MobileIndex>
                            </S.MobileLink>
                        </S.MobileItem>
                    ))}
                </S.MobileList>
            </S.MobileMenu>
        </S.HeaderStyled>
    );
}