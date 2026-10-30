import * as S from "./HeaderStyled";

export default function Header() {
    return (
        <S.HeaderStyled>
            <S.ButtonHeaderStyled>
                <p>
                    Café
                </p>
            </S.ButtonHeaderStyled>
            <S.ButtonHeaderStyled>
                <p>
                    Eventos
                </p>
            </S.ButtonHeaderStyled>
        </S.HeaderStyled>
    );
}
