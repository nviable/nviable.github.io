import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Link,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { fetchProjectBySlug } from '../lib/sanity'
import type { Project } from '../types/content'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ProjectDetail() {
  const { projectSlug } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProject() {
      if (!projectSlug) return

      try {
        const data = await fetchProjectBySlug(projectSlug)
        setProject(data)
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [projectSlug])

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Breadcrumbs items={[
          { label: 'Research', path: '/research' },
          { label: 'Loading...' }
        ]} />
        <VStack spacing={6} align="stretch">
          <Skeleton height="48px" />
          <Skeleton height="24px" />
          <Skeleton height="120px" />
          <Divider />
          <Skeleton height="32px" />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height="120px" />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    )
  }

  if (!project) {
    return (
      <Container maxW="container.xl" py={8}>
        <Breadcrumbs items={[
          { label: 'Research', path: '/research' },
          { label: 'Project Not Found' }
        ]} />
        <Text>Project not found.</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Breadcrumbs items={[
        { label: 'Research', path: '/research' },
        { label: project.title }
      ]} />

      <VStack spacing={8} align="stretch">
        {/* Project Header */}
        <Box>
          <Heading as="h1" size="xl" mb={4} color="brand.purple.600">
            {project.title}
          </Heading>

          <HStack spacing={4} mb={4} flexWrap="wrap">
            {project.startDate && (
              <HStack spacing={2}>
                <Text fontSize="sm" color="gray.600">
                  📅 {new Date(project.startDate).getFullYear()}
                  {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                </Text>
              </HStack>
            )}
            {project.url && (
              <Link href={project.url} isExternal color="brand.yellow.600" _hover={{ color: 'brand.yellow.700' }}>
                Visit Project ↗
              </Link>
            )}
          </HStack>

          <Text fontSize="lg" mb={4}>
            {project.shortDescription}
          </Text>

          {project.tags && project.tags.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {project.tags.map((tag) => (
                <Badge key={tag} colorScheme="purple" variant="subtle">
                  {tag}
                </Badge>
              ))}
            </HStack>
          )}
        </Box>

        {/* Project Body */}
        {project.body && (
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              About This Project
            </Heading>
            <Text>{project.body}</Text>
          </Box>
        )}

        <Divider />

        {/* Associated Publications */}
        {project.publications && project.publications.length > 0 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Research Publications ({project.publications.length})
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {project.publications.map((pub) => (
                <Card key={pub._id} variant="outline">
                  <CardHeader pb={2}>
                    <Heading size="md" mb={2}>
                      {pub.url ? (
                        <Link href={pub.url} isExternal color="brand.purple.600" _hover={{ color: 'brand.purple.700' }}>
                          {pub.title} ↗
                        </Link>
                      ) : (
                        pub.title
                      )}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      {pub.authors?.join(', ')} • {pub.venue} • {pub.date}
                    </Text>
                  </CardHeader>
                  <CardBody pt={0}>
                    {pub.abstract && (
                      <Text fontSize="sm" noOfLines={3} color="gray.700">
                        {pub.abstract}
                      </Text>
                    )}
                    {pub.tags && pub.tags.length > 0 && (
                      <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                        {pub.tags.map((tag) => (
                          <Badge key={tag} size="sm" colorScheme="blue" variant="subtle">
                            {tag}
                          </Badge>
                        ))}
                      </Stack>
                    )}
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Associated Media Appearances */}
        {project.mediaAppearances && project.mediaAppearances.length > 0 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Media Coverage ({project.mediaAppearances.length})
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {project.mediaAppearances.map((media) => (
                <Card key={media._id} variant="outline">
                  <CardHeader pb={2}>
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
                      <Text fontSize="sm" noOfLines={3} color="gray.700">
                        {media.description}
                      </Text>
                    )}
                    <Badge colorScheme="green" variant="subtle" mt={2}>
                      {media.category}
                    </Badge>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* No associated content message */}
        {(!project.publications || project.publications.length === 0) &&
          (!project.mediaAppearances || project.mediaAppearances.length === 0) && (
            <Box textAlign="center" py={8}>
              <Text color="gray.500">
                No publications or media coverage associated with this project yet.
              </Text>
            </Box>
          )}
      </VStack>
    </Container>
  )
}
