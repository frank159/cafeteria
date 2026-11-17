import { styled } from "styled-components";

export const HeaderStyled = styled.button<{ $isScrolled: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 5rem;
    width: 100%;
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-right: 5rem;
    font-family: "Asap Condensed", sans-serif;
    isolation: isolate;

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
    gap: 3rem;
    display: flex;
`


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
