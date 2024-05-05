import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';


type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    size?: "primary" | "secondary";
    url?: string | null;
    target?: string | null;
    icon?: IconProp | null;
};

export default function Button({
    onClick,
    disabled = false,
    children,
    type = "button",
    size = "primary",
    url = null,
    target = null,
    icon = null,
}: ButtonProps) {
    return url ? (
        <a
            className={`btn btn-${size} py-2 px-4 rounded`}
            target={target || "_self"}
            href={url}
        >
            {icon !== null ? <FontAwesomeIcon className="w-4 h-4 inline-block" icon={icon} /> : ""}
            {children}
        </a>
    ) : (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn btn-${size} py-2 px-4 rounded`}
        >
            {icon !== null ? <FontAwesomeIcon className="w-4 h-4 inline-block" icon={icon} /> : ""}
            {children}
        </button>
    );
}