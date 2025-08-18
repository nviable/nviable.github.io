import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchMediaAppearances } from '../lib/sanity'
import type { MediaAppearance } from '../types/content'
import Breadcrumbs from '../components/Breadcrumbs'
import { LoadingSkeleton, ErrorBoundary } from '../components/ui'
import { MediaItem } from '../components/content'
import { motion } from 'framer-motion'

export default function MediaArchive() {
  const [mediaAppearances, setMediaAppearances] = useState<MediaAppearance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMedia = async () => {
      try {
        setLoading(true)
        const data = await fetchMediaAppearances()
        setMediaAppearances(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load media appearances')
      } finally {
        setLoading(false)
      }
    }
    loadMedia()
  }, [])

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    const loadData = async () => {
      try {
        const data = await fetchMediaAppearances()
        setMediaAppearances(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load media appearances')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Breadcrumbs items={[{ label: 'Media' }]} />
        <LoadingSkeleton type="list" count={5} />
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Breadcrumbs items={[{ label: 'Media' }]} />

      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={6}>
            Media Appearances
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Coverage of my research and work in various media outlets.
          </Text>
        </Box>

        <ErrorBoundary
          error={error}
          onRetry={handleRetry}
          showRetry={true}
        />

        {!loading && !error && (
          <VStack align="stretch" spacing={4}>
            {mediaAppearances.map((media, idx) => (
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
          </VStack>
        )}
      </VStack>
    </Container>
  )
}
