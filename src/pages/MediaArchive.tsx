import { Box, Heading, Text, VStack, Link, Badge, Image, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchMediaAppearances } from '../lib/sanity'
import type { MediaAppearance } from '../types/content'

const MediaArchive = () => {
  const [items, setItems] = useState<MediaAppearance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchMediaAppearances()
        setItems(data)
      } catch (e: any) {
        setError(e?.message || 'Failed to load media appearances')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Media Appearances
      </Heading>
      {loading && <Text>Loading…</Text>}
      {error && (
        <Text color="red.600" mb={4}>
          {error}
        </Text>
      )}
      <VStack align="stretch" spacing={4}>
        {items.map((m) => (
          <HStack key={m._id} align="start" spacing={4} p={4} border="2px solid" borderColor="black" boxShadow="4px 4px 0px 0px" bg="white">
            {('imageUrl' in m && (m as any).imageUrl) ? (
              <Image src={(m as any).imageUrl} alt={m.title} boxSize="96px" objectFit="cover" />
            ) : null}
            <Box>
              <Heading as="h3" size="md">
                <Link href={m.url} isExternal color="brand.purple.700">
                  {m.title}
                </Link>
              </Heading>
              <Text fontSize="sm" color="gray.600" mt={1}>
                {m.outlet} {m.date ? `• ${new Date(m.date).toLocaleDateString()}` : ''}
              </Text>
              {m.description && (
                <Text fontSize="sm" color="gray.700" mt={2}>
                  {m.description}
                </Text>
              )}
              {m.category && (
                <Badge mt={2}>{m.category}</Badge>
              )}
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

export default MediaArchive
