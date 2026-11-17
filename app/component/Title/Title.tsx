import type { ElementType, ReactNode } from "react";
import * as S from "./TitleStyled";

type TitleProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export default function Title({ children, as, className }: TitleProps) {
  return (
    <S.TitleElement as={as} className={className}>
      {children}
    </S.TitleElement>
  );
}