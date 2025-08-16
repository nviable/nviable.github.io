import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Skeleton,
  Link,
} from '@chakra-ui/react'
import { fetchMediaAppearances } from '../lib/sanity'
import type { MediaAppearance } from '../types/content'
import Breadcrumbs from '../components/Breadcrumbs'

export default function MediaArchive() {
  const [mediaAppearances, setMediaAppearances] = useState<MediaAppearance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMediaAppearances() {
      try {
        const data = await fetchMediaAppearances()
        setMediaAppearances(data)
      } catch (error) {
        console.error('Error loading media appearances:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMediaAppearances()
  }, [])

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Breadcrumbs items={[{ label: 'Media' }]} />
        <VStack spacing={6} align="stretch">
          <Skeleton height="48px" />
          <Skeleton height="24px" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="120px" />
          ))}
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Breadcrumbs items={[{ label: 'Media' }]} />

      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={4}>
            Media Coverage
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Media appearances, interviews, and coverage of my research and projects.
          </Text>
        </Box>

        <VStack align="stretch" spacing={4}>
          {mediaAppearances.map((media) => (
            <Card key={media._id} variant="outline">
              <CardHeader>
                <Heading size="md" mb={2}>
                  {media.url ? (
                    <Link href={media.url} isExternal color="brand.purple.600" _hover={{ color: 'brand.purple.700' }}>
                      {media.title} ↗
                    </Link>
                  ) : (
                    media.title
                  )}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {media.outlet} • {new Date(media.date).toLocaleDateString()}
                </Text>
              </CardHeader>
              <CardBody pt={0}>
                {media.description && (
                  <Text mb={4} color="gray.700">
                    {media.description}
                  </Text>
                )}
                <Badge colorScheme="green" variant="subtle">
                  {media.category}
                </Badge>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </VStack>
    </Container>
  )
}
