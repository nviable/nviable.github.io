import { Card, forwardRef } from '@chakra-ui/react'
import type { CardProps } from '@chakra-ui/react'

interface ContentCardProps extends CardProps {
    variant?: 'outline' | 'filled' | 'elevated'
    hover?: boolean
}

const ContentCard = forwardRef<ContentCardProps, 'div'>(({
    variant = 'outline',
    hover = false,
    children,
    ...props
}, ref) => {
    const hoverStyles = hover ? {
        _hover: {
            shadow: 'md',
            transform: 'translateY(-2px)'
        },
        transition: 'all 0.2s'
    } : {}

    return (
        <Card
            ref={ref}
            variant={variant}
            {...hoverStyles}
            {...props}
        >
            {children}
        </Card>
    )
})

ContentCard.displayName = 'ContentCard'

export default ContentCard
