import { Box, Heading, Text, VStack, Link, Badge, SimpleGrid, Card, CardBody, CardHeader, Skeleton, Stack, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchPublications, fetchProjects } from '../lib/sanity'
import type { Publication, Project } from '../types/content'
import { Link as RouterLink } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'

const Research = () => {
  const [publications, setPublications] = useState<Publication[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [publicationsData, projectsData] = await Promise.all([
          fetchPublications(),
          fetchProjects()
        ])
        setPublications(publicationsData)
        setProjects(projectsData)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load research data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <Container maxW="container.xl" py={8}>
      <Breadcrumbs items={[{ label: 'Research' }]} />

      <VStack spacing={8} align="stretch">
        {/* Research Overview */}
        <Box>
          <Heading as="h1" size="xl" mb={4}>
            Research
          </Heading>
          <Text color="gray.600" fontSize="lg">
            My research focuses on deepfake detection, media forensics, and developing tools for journalists and law enforcement.
            Below you'll find my projects and publications.
          </Text>
        </Box>

        {/* Projects Grid */}
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Research Projects
          </Heading>
          {loading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {[...Array(3)].map((_, i) => (
                <Card key={i} variant="outline">
                  <CardHeader>
                    <Skeleton height="24px" mb={2} />
                    <Skeleton height="16px" />
                  </CardHeader>
                  <CardBody>
                    <Skeleton height="60px" />
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {projects.map((project) => (
                <Card
                  key={project._id}
                  variant="outline"
                  _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <Heading size="md" mb={2}>
                      <Link
                        as={RouterLink}
                        to={`/research/${project.slug.current}`}
                        color="brand.purple.600"
                        _hover={{ color: 'brand.purple.700' }}
                      >
                        {project.title}
                      </Link>
                    </Heading>
                    {project.startDate && (
                      <Text fontSize="sm" color="gray.600">
                        {new Date(project.startDate).getFullYear()}
                        {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                      </Text>
                    )}
                  </CardHeader>
                  <CardBody pt={0}>
                    <Text mb={4} noOfLines={3}>
                      {project.shortDescription}
                    </Text>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                      {project.tags?.map((tag) => (
                        <Badge key={tag} colorScheme="purple" variant="subtle">
                          {tag}
                        </Badge>
                      ))}
                    </Stack>
                    {project.url && (
                      <Link
                        href={project.url}
                        isExternal
                        color="brand.yellow.600"
                        fontSize="sm"
                        mt={4}
                        display="inline-block"
                        _hover={{ color: 'brand.yellow.700' }}
                      >
                        External Link →
                      </Link>
                    )}
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* Publications */}
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Publications
          </Heading>
          <Text mb={6} color="gray.600">
            Papers listed chronologically.
          </Text>

          {error && (
            <Text color="red.600" mb={4}>
              {error}
            </Text>
          )}

          <VStack align="stretch" spacing={4}>
            {publications.map((p) => (
              <Box key={p._id} p={4} border="2px solid" borderColor="black" boxShadow="4px 4px 0px 0px" bg="white">
                <Heading as="h3" size="md">
                  {p.title}
                </Heading>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {p.authors?.join(', ')} {p.date ? `(${p.date})` : ''}
                </Text>
                <Text fontSize="sm" color="gray.700" mt={1}>
                  {p.venue}
                </Text>
                <VStack align="start" spacing={2} mt={3}>
                  <Box>
                    {p.url && (
                      <Link href={p.url} isExternal color="brand.purple.700" mr={4}>
                        View
                      </Link>
                    )}
                  </Box>
                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <Box>
                      {p.tags.map((t) => (
                        <Badge key={t} mr={2}>
                          {t}
                        </Badge>
                      ))}
                    </Box>
                  )}
                </VStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Research
