import { Box, Heading, Text, VStack, SimpleGrid, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchPublications, fetchProjects } from '../lib/sanity'
import type { Publication, Project } from '../types/content'
import Breadcrumbs from '../components/Breadcrumbs'
import { LoadingSkeleton, ErrorBoundary } from '../components/ui'
import { motion } from 'framer-motion'
import { ProjectCard, PublicationItem } from '../components/content'

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

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    // Re-run the load function
    const loadData = async () => {
      try {
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
    loadData()
  }

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
            <LoadingSkeleton type="grid" count={3} />
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {projects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
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

          <ErrorBoundary
            error={error}
            onRetry={handleRetry}
            showRetry={true}
          />

          {!loading && !error && (
            <VStack align="stretch" spacing={4}>
              {publications.map((publication, idx) => (
                <motion.div
                  key={publication._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <PublicationItem
                    publication={publication}
                    variant="compact"
                    showTags={true}
                  />
                </motion.div>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  )
}

export default Research
