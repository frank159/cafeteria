"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import * as S from "./HeaderStyled";
import Image from "next/image";

const links = [
    { label: "HOME", id: "home" },
    { label: "BOLOS E CAFÉS", id: "bolos-e-cafes" },
    { label: "NOSSOS ESPAÇOS", id: "espacos" },
    { label: "EVENTOS", id: "eventos" },
    { label: "CONTATO", id: "contato" },
];

// Ajustes da animação da estrela
const SPIN_BASE = 30;    // graus por segundo no ritmo normal
const SPIN_FAST = 720;   // graus por segundo ao clicar
const SPIN_HOLD = 1000;  // ms em velocidade máxima
const SPIN_DECEL = 1000; // ms para desacelerar até o ritmo normal

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

    const starRef = useRef<HTMLSpanElement>(null);
    const burstStart = useRef<number | null>(null);

    const close = () => setOpen(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    // Loop de rotação da estrela
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let angle = 0;
        let last = performance.now();
        let frame = 0;

        const tick = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;

            let speed = SPIN_BASE;
            const start = burstStart.current;

            if (start !== null) {
                const t = now - start;
                if (t < SPIN_HOLD) {
                    speed = SPIN_FAST;
                } else if (t < SPIN_HOLD + SPIN_DECEL) {
                    const p = (t - SPIN_HOLD) / SPIN_DECEL;
                    const eased = 1 - Math.pow(1 - p, 3);
                    speed = SPIN_FAST + (SPIN_BASE - SPIN_FAST) * eased;
                } else {
                    burstStart.current = null;
                }
            }

            angle = (angle + speed * dt) % 360;
            if (starRef.current) {
                starRef.current.style.transform = `rotate(${angle}deg)`;
            }

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    const spin = () => {
        burstStart.current = performance.now();
    };

    const scrollTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        scrollToSection(id);
    };

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
            <S.LogoLink
                href="#home"
                aria-label="Página inicial"
                onClick={(e) => {
                    scrollTo("home")(e);
                    close();
                    spin();
                }}
            >
                <S.Mark aria-hidden="true">
                    <S.MarkStar ref={starRef}>
                        <Image src="/svg/Cafune.svg" alt="" fill unoptimized />
                    </S.MarkStar>
                    <S.MarkBean>
                        <Image src="/svg/café.svg" alt="" fill unoptimized />
                    </S.MarkBean>
                </S.Mark>

                <Image
                    src="/imgs/LogoHeader.png"
                    alt="Logo da cafeteria"
                    width={140}
                    height={47}
                />
            </S.LogoLink>

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