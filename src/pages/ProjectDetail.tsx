import { Box, Heading, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const ProjectDetail = () => {
  const { projectSlug } = useParams()

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Project: {projectSlug}
      </Heading>
      <Text>Project detail page coming soon...</Text>
    </Box>
  )
}

export default ProjectDetail
