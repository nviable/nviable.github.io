import { Box, Heading, Text, VStack, SimpleGrid, Container, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProjectBySlug } from '../lib/sanity'
import type { Project } from '../types/content'
import Breadcrumbs from '../components/Breadcrumbs'
import { LoadingSkeleton, ErrorBoundary } from '../components/ui'
import { PublicationItem, MediaItem } from '../components/content'
import { motion } from 'framer-motion'

export default function ProjectDetail() {
  const { projectSlug } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProject = async () => {
      if (!projectSlug) return

      try {
        setLoading(true)
        const data = await fetchProjectBySlug(projectSlug)
        setProject(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load project')
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [projectSlug])

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    const loadData = async () => {
      if (!projectSlug) return
      try {
        const data = await fetchProjectBySlug(projectSlug)
        setProject(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load project')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Breadcrumbs items={[
          { label: 'Research', path: '/research' },
          { label: 'Loading...' }
        ]} />
        <LoadingSkeleton type="list" count={3} />
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
          <Heading as="h1" size="xl" mb={4}>
            {project.title}
          </Heading>

          <VStack align="start" spacing={3}>
            {project.startDate && (
              <Text color="gray.600">
                📅 {new Date(project.startDate).toLocaleDateString()}
                {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
              </Text>
            )}

            {project.url && (
              <Link
                href={project.url}
                isExternal
                color="brand.yellow.600"
                _hover={{ color: 'brand.yellow.700' }}
              >
                ↗ Visit Project
              </Link>
            )}
          </VStack>
        </Box>

        {/* Project Description */}
        {project.shortDescription && (
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Overview
            </Heading>
            <Text fontSize="lg" color="gray.700">
              {project.shortDescription}
            </Text>
          </Box>
        )}

        {/* Project Body Content */}
        {project.body && (
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Details
            </Heading>
            <Text color="gray.700" whiteSpace="pre-wrap">
              {project.body}
            </Text>
          </Box>
        )}

        {/* Related Publications */}
        {project.publications && project.publications.length > 0 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Research Publications
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {project.publications.map((pub, idx) => (
                <motion.div
                  key={pub._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <PublicationItem
                    publication={pub}
                    variant="compact"
                    showTags={true}
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Related Media Coverage */}
        {project.mediaAppearances && project.mediaAppearances.length > 0 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Media Coverage
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {project.mediaAppearances.map((media, idx) => (
                <motion.div
                  key={media._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <MediaItem
                    media={media}
                    variant="compact"
                    showCategory={true}
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          </Box>
        )}

        <ErrorBoundary
          error={error}
          onRetry={handleRetry}
          showRetry={true}
        />
      </VStack>
    </Container>
  )
}
