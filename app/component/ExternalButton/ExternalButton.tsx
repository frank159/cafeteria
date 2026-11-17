import type { ReactNode } from "react";
import * as S from "./ExternalButtonStyled";

interface ExternalButtonProps {
    children: ReactNode;
    href: string;
    hideOnMobile?: boolean;
}

export default function ExternalButton({
    children,
    href,
    hideOnMobile = false,
}: ExternalButtonProps) {
    return (
        <S.ExternalLink
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            $hideOnMobile={hideOnMobile}
        >
            {children}
        </S.ExternalLink>
    );
}