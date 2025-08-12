import { Box, Heading, Text, VStack, Link, Badge } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchPublications } from '../lib/sanity'
import type { Publication } from '../types/content'

const Research = () => {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPublications()
        setPublications(data)
      } catch (e: any) {
        setError(e?.message || 'Failed to load publications')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Research
      </Heading>
      <Text mb={6} color="gray.600">
        Papers listed chronologically.
      </Text>

      {loading && <Text>Loading…</Text>}
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
              {p.authors?.join(', ')} {p.year ? `(${p.year})` : ''}
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
                {p.pdfUrl && (
                  <Link href={p.pdfUrl} isExternal color="brand.purple.700">
                    PDF
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
  )
}

export default Research
