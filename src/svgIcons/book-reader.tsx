import * as React from "react"

interface BookReaderIconProps {
    className?: string
}

const BookReaderIcon = (props: BookReaderIconProps) => (
    <svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                d="M11 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM7.3 7.534C5.446 6.4 2.443 6.088.93 6.002.423 5.972 0 6.36 0 6.848v6.963a.86.86 0 0 0 .828.845c1.364.071 4.125.334 6.032 1.295.293.147.64-.054.64-.371V7.892a.416.416 0 0 0-.2-.358Zm7.769-1.532c-1.511.085-4.515.397-6.368 1.532a.424.424 0 0 0-.2.364v7.68c0 .32.347.52.641.373 1.908-.96 4.666-1.223 6.03-1.294A.86.86 0 0 0 16 13.81V6.848c0-.488-.423-.875-.931-.846Z"
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

export default BookReaderIcon
