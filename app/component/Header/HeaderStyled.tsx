import { styled } from "styled-components";

export const HeaderStyled = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 5rem;
    width: 100%;
    gap: 1rem;
    display: flex;
    align-items: end;
    justify-content: end;
    flex-direction: row;
    padding-right: 5rem;
`;

export const ButtonHeaderStyled = styled.button`
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    width: fit-content;
    &:hover {
    background-color: #390102;
    }
`;
