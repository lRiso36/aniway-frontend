import type { ReactNode, ElementType } from "react";

type FieldBoxProps = {
    children: ReactNode,
    as?: ElementType,
    className?: string,
    onClick?: () => void,
};

export const FieldBox = ({ children, as: Tag = "div", className = "", onClick }: FieldBoxProps) => {
    return (
        <Tag
            onClick={onClick}
            className={`bg-[#2a2a3e] text-white text-sm rounded-lg outline-none focus:outline-none ${className}`}
        >
            {children}
        </Tag>
    );
};