import { Badge, Stack } from '@chakra-ui/react'
import type { BadgeProps } from '@chakra-ui/react'

interface TagListProps {
    tags: string[]
    colorScheme?: BadgeProps['colorScheme']
    size?: BadgeProps['size']
    variant?: BadgeProps['variant']
    spacing?: number
}

const TagList = ({
    tags,
    colorScheme = 'purple',
    size = 'sm',
    variant = 'subtle',
    spacing = 2
}: TagListProps) => {
    if (!tags || tags.length === 0) return null

    return (
        <Stack direction="row" flexWrap="wrap" gap={spacing}>
            {tags.map((tag) => (
                <Badge
                    key={tag}
                    colorScheme={colorScheme}
                    variant={variant}
                    size={size}
                >
                    {tag}
                </Badge>
            ))}
        </Stack>
    )
}

export default TagList
