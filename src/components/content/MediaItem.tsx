import { Box, Heading, Text, Link, Badge, HStack, VStack } from '@chakra-ui/react'
import type { MediaAppearance } from '../../types/content'

interface MediaItemProps {
    media: MediaAppearance
    variant?: 'compact' | 'detailed'
    showCategory?: boolean
}

const MediaItem = ({
    media,
    variant = 'compact',
    showCategory = true
}: MediaItemProps) => {
    const isDetailed = variant === 'detailed'

    return (
        <Box
            p={isDetailed ? 6 : 4}
            border="2px solid"
            borderColor="black"
            boxShadow="4px 4px 0px 0px"
            bg="white"
        >
            <VStack align="start" spacing={isDetailed ? 4 : 3}>
                <Box>
                    <Heading as="h3" size={isDetailed ? "lg" : "md"}>
                        {media.title}
                    </Heading>

                    <HStack spacing={4} mt={1}>
                        <Text fontSize="sm" color="gray.600">
                            {media.outlet}
                        </Text>
                        {media.date && (
                            <Text fontSize="sm" color="gray.600">
                                {new Date(media.date).toLocaleDateString()}
                            </Text>
                        )}
                    </HStack>
                </Box>

                {media.description && (
                    <Text fontSize={isDetailed ? "md" : "sm"} color="gray.700">
                        {media.description}
                    </Text>
                )}

                <HStack spacing={3}>
                    {showCategory && media.category && (
                        <Badge colorScheme="purple" variant="subtle">
                            {media.category}
                        </Badge>
                    )}

                    {media.url && (
                        <Link
                            href={media.url}
                            isExternal
                            color="brand.purple.700"
                            fontSize={isDetailed ? "md" : "sm"}
                        >
                            Read Article →
                        </Link>
                    )}
                </HStack>
            </VStack>
        </Box>
    )
}

export default MediaItem
