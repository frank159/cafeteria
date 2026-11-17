import { styled } from "styled-components";

export const ButtonStyled = styled.button`
    background-color: #3d1c14;
    color: #000;
    border: 1px solid #A4B9CE;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    width: fit-content;
    color: #A4B9CE;
    font-family: var(--font-bona-nova-sc), serif;
    z-index: 999;
    animation: button-appear 0.4s ease-out both;
    transition: transform 0.2s ease, background-color 0.4s ease;

    &:hover {
        background-color: #A4B9CE;
        color: #3a1717;
        transform: translateY(-2px);
    }

    @keyframes button-appear {
        from {
            opacity: 0;
            transform: translateY(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 767px) {
        transition: 0.4s;
        font-size: 1rem;
    }
`;
