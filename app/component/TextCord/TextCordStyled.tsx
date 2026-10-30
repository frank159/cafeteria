import { styled } from "styled-components";

export const TextCordContainer = styled.div`
    height: 100%;
`;

export const TextCordContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const TextCordTitle = styled.h1<{ align?: string }>`
    font-size: 3rem;
    margin-bottom: 1rem;
    text-align: ${(props) => props.align || "left"};
    
    /* Se o alinhamento for à direita, empurra o bloco para a direita */
    ${(props) => (props.align === "right" || props.align === "flex-end") && "margin-left: auto;"}

    @media (max-width: 767px) {
        font-size: 2rem;
    }
`;

export const TextCordDescription = styled.p<{ width?: string; align?: string }>`
    width: ${(props) => props.width};
    font-size: 1.25rem;
    line-height: 1.5;
    text-align: ${(props) => props.align || "left"};
    
    /* Se o alinhamento for à direita, empurra o bloco para a direita */
    ${(props) => (props.align === "right" || props.align === "flex-end") && "margin-left: auto;"}
    
    @media (max-width: 767px) {
        font-size: 1rem;
    }
`;

export const TextCordExt = styled(TextCordDescription)<{ width?: string; align?: string }>`
    padding-top: 2.5rem;
`;