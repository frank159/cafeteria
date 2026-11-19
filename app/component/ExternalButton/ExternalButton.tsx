import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";
import * as S from "./ExternalButtonStyled";

type ExternalAnchorProps = ComponentPropsWithoutRef<"a"> & {
    as: "a";
    $hideOnMobile: boolean;
};

const ExternalAnchor = S.ButtonStyled as unknown as ComponentType<ExternalAnchorProps>;

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
        <ExternalAnchor
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            $hideOnMobile={hideOnMobile}
        >
            {children}
        </ExternalAnchor>
    );
}