"use client";

import * as S from "./TextCordStyled";

interface TextCordProps {
    width: string;
    Title: string;
    Description: string;
    Extra?: string;
    titleAlign?: "flex-start" | "center" | "flex-end" | "left" | "right";
    descriptionAlign?: "flex-start" | "center" | "flex-end" | "left" | "right";
}

export default function TextCord({ 
    width, 
    Title, 
    Description, 
    Extra,
    titleAlign = "flex-start", 
    descriptionAlign = "flex-start" 
}: TextCordProps) {
    return (
        <S.TextCordContainer>
            <S.TextCordContent>
                <S.TextCordTitle align={titleAlign}>
                    {Title}
                </S.TextCordTitle>
                <S.TextCordDescription width={width} align={descriptionAlign}>
                    {Description}
                </S.TextCordDescription>
                <S.TextCordExt width={width} align={descriptionAlign}>
                    {Extra}
                </S.TextCordExt>
            </S.TextCordContent>
        </S.TextCordContainer>
    );
}

