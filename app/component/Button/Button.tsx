import * as S from "./ButtonStyled";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    return (
        <S.ButtonStyled>
            <p>
                {text}
            </p>
        </S.ButtonStyled>
    );
}
