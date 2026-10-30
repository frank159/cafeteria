import { styled } from "styled-components";

export const TitleElement = styled.h1`
  margin: 0;
  font-family: var(--font-bona-nova-sc), serif;
  font-weight: 400;
  font-size: 64px;
  line-height: 1.2;
  letter-spacing: 0.02em;
  font-variant: small-caps;
  text-transform: none;
  color: #a9bdd6;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;