import * as React from "react"

interface LocationIconProps {
    className?: string
}

const LocationIcon = (props: LocationIconProps) => (
    <svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                d="M13.891.11.898 6.107c-1.499.7-1 2.898.6 2.898h5.497v5.497c0 1.6 2.199 2.1 2.899.6L15.89 2.11c.5-1.2-.8-2.499-1.999-1.999Z"
                fill="#DDD"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
)

export default LocationIcon
