import * as S from "./ButtonStyled";

interface ButtonProps {
  text: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}

export default function Button({ text, href, target, onClick }: ButtonProps) {
  const content = <span>{text}</span>;

  if (href) {
    return (
      <S.ButtonStyled as="a" href={href} onClick={onClick} target={target}>
        {content}
      </S.ButtonStyled>
    );
  }

  return <S.ButtonStyled type="button" onClick={onClick}>{content}</S.ButtonStyled>;
}