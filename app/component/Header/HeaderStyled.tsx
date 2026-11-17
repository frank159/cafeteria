import { styled } from "styled-components";

const DESKTOP = "(min-width: 1024px)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)";
const MENU_BG = "#3d1c14"; // versão opaca do fundo do header

const EXIT_WAIT = "calc((var(--count) - 1) * 35ms + 260ms)";

export const HeaderStyled = styled.header<{ $isScrolled: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 4rem;
    width: 100%;
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-right: 0;
    font-family: "Asap Condensed", sans-serif;
    isolation: isolate;

    @media ${DESKTOP} {
        height: 5rem;
        padding-right: 5rem;
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        background-color: #3d1c1499;
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        -webkit-mask-image: linear-gradient(to bottom, #000 100%, transparent 100%);
        mask-image: linear-gradient(to bottom, #000 100%, transparent 100%);
        opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0)};
        transition: opacity 300ms ease-in-out;
    }
`;

export const ButtonSection = styled.div`
    display: none;
    gap: 3rem;

    @media ${DESKTOP} {
        display: flex;
    }
`;

export const ButtonHeaderStyled = styled.button`
    color: #ffffff;
    font-family: "Asap Condensed", sans-serif;
    border: none;
    padding: 0;
    font-size: 16px;
    cursor: pointer;
    width: fit-content;
    position: relative;
    background: transparent;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #ffffff;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 250ms ease;
    }

    &:hover::after {
        transform: scaleX(1);
    }

    @media (prefers-reduced-motion: reduce) {
        &::after {
            transition: none;
        }
    }
`;

/* ---------- Botão sanduíche -> X ---------- */
export const BurgerButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 3.5rem;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
        transform: scale(0.9);
    }

    @media ${DESKTOP} {
        display: none;
    }
`;

export const BurgerIcon = styled.span<{ $open: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 16px;

    span {
        display: block;
        width: 100%;
        height: 2px;
        background: #ffffff;
        transform-origin: center;
        transition:
            transform 350ms ${EASE_OUT},
            opacity 350ms ${EASE_OUT};
    }

    ${({ $open }) =>
        $open
            ? `
        span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    `
            : ""}

    @media (prefers-reduced-motion: reduce) {
        span {
            transition: none;
        }
    }
`;

/* ---------- Fundo escurecido com blur (começa abaixo do header) ---------- */
export const Backdrop = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 4rem 0 0 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.3);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    transition: ${({ $open }) =>
        $open
            ? "opacity 300ms ease, visibility 0s"
            : `opacity 450ms ease ${EXIT_WAIT}, visibility 0s linear calc(${EXIT_WAIT} + 450ms)`};

    @media ${DESKTOP} {
        display: none;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

/* ---------- Painel do menu ---------- */
export const MobileMenu = styled.nav<{ $open: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: calc(100svh - 4rem);
    overflow-y: auto;
    background: ${MENU_BG};
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    clip-path: ${({ $open }) => ($open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    transition: ${({ $open }) =>
        $open
            ? `clip-path 500ms ${EASE_OUT}, opacity 500ms ${EASE_OUT}, visibility 0s`
            : `clip-path 450ms ${EASE_IN_OUT} ${EXIT_WAIT},
               opacity 450ms ${EASE_IN_OUT} ${EXIT_WAIT},
               visibility 0s linear calc(${EXIT_WAIT} + 450ms)`};

    @media ${DESKTOP} {
        display: none;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const MobileList = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0.75rem 1.25rem;
    list-style: none;
`;

export const MobileItem = styled.li<{ $open: boolean }>`
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    &:last-child {
        border-bottom: none;
    }

    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-24px)")};
    transition: ${({ $open }) =>
        $open
            ? `opacity 400ms ${EASE_OUT}, transform 400ms ${EASE_OUT}`
            : "opacity 260ms ease, transform 260ms ease"};
    transition-delay: ${({ $open }) =>
        $open
            ? "calc(120ms + var(--i) * 50ms)"
            : "calc((var(--count) - 1 - var(--i)) * 35ms)"};

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const MobileLink = styled.a`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 0.75rem;
    padding: 1rem 0;
    color: #ffffff;
    font-family: "Asap Condensed", sans-serif;
    font-size: 1.125rem;
    text-transform: uppercase;
    text-decoration: none;
    transition: transform 200ms ease;

    &:active {
        transform: translateX(6px);
    }
`;

export const MobileIndex = styled.span`
    width: 1.5rem;
    font-size: 11px;
    font-weight: 600;
    opacity: 0.6;
`;