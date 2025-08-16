import { Box, Heading, Text, Link, VStack } from '@chakra-ui/react'
import type { BadgeProps } from '@chakra-ui/react'
import type { Publication } from '../../types/content'
import TagList from '../ui/TagList'

interface PublicationItemProps {
    publication: Publication
    variant?: 'compact' | 'detailed'
    showTags?: boolean
    tagColorScheme?: BadgeProps['colorScheme']
}

const PublicationItem = ({
    publication,
    variant = 'compact',
    showTags = true,
    tagColorScheme = 'gray'
}: PublicationItemProps) => {
    const isDetailed = variant === 'detailed'

    return (
        <Box
            p={isDetailed ? 6 : 4}
            border="2px solid"
            borderColor="black"
            boxShadow="4px 4px 0px 0px"
            bg="white"
        >
            <Heading as="h3" size={isDetailed ? "lg" : "md"}>
                {publication.title}
            </Heading>

            <Text fontSize="sm" color="gray.600" mt={1}>
                {publication.authors?.join(', ')} {publication.date ? `(${publication.date})` : ''}
            </Text>

            <Text fontSize="sm" color="gray.700" mt={1}>
                {publication.venue}
            </Text>

            <VStack align="start" spacing={isDetailed ? 3 : 2} mt={3}>
                {publication.url && (
                    <Box>
                        <Link
                            href={publication.url}
                            isExternal
                            color="brand.purple.700"
                            mr={4}
                            fontSize={isDetailed ? "md" : "sm"}
                        >
                            View
                        </Link>
                    </Box>
                )}

                {showTags && publication.tags && Array.isArray(publication.tags) && (
                    <Box>
                        <TagList
                            tags={publication.tags}
                            colorScheme={tagColorScheme}
                            spacing={isDetailed ? 3 : 2}
                        />
                    </Box>
                )}
            </VStack>
        </Box>
    )
}

export default PublicationItem
