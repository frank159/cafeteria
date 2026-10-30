import type { ElementType, ReactNode } from "react";
import * as S from "./TitleStyled";

type TitleProps = {
  children: ReactNode;
  /** Tag HTML renderizada. Padrão: h1 */
  as?: ElementType;
  className?: string;
};

/** Título: 64px no desktop, 36px no mobile (até 768px). */
export default function Title({ children, as, className }: TitleProps) {
  return (
    <S.TitleElement as={as} className={className}>
      {children}
    </S.TitleElement>
  );
}