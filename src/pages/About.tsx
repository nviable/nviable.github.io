import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Breadcrumbs from '../components/Breadcrumbs'

export default function About() {
  return (
    <Container maxW="container.xl" py={8}>
      <Breadcrumbs items={[{ label: 'About' }]} />

      <Box>
        <Heading as="h1" size="xl" mb={6}>
          About Me
        </Heading>
        <Text fontSize="lg" color="gray.600">
          About page coming soon...
        </Text>
      </Box>
    </Container>
  )
}
