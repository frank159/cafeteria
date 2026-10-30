import type { ElementType, ReactNode } from "react";
import * as S from "./TextStyled";

type TextProps = {
  children: ReactNode;
  /** Tag HTML renderizada. Padrão: p */
  as?: ElementType;
  className?: string;
};

/** Texto: 16px no desktop e no mobile. */
export default function Text({ children, as, className }: TextProps) {
  return (
    <S.TextElement as={as} className={className}>
      {children}
    </S.TextElement>
  );
}