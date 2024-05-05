import React, { ReactNode } from 'react';

interface PillProps {
    children: ReactNode;
    color?: string;
}

const Pill: React.FC<PillProps> = ({
    children,
    color = "bg-gray-800",
}) => {
    return (
        <div className={color + " px-4 inline-block rounded-md"}>
            {children}
        </div>
    );
};

export default Pill;