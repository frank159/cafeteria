import type { ElementType, ReactNode } from "react";
import * as S from "./TextStyled";

type TextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export default function Text({ children, as, className }: TextProps) {
  return (
    <S.TextElement as={as} className={className}>
      {children}
    </S.TextElement>
  );
}