import { Box, Heading, Text, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center" py={12}>
        <Heading
          as="h1"
          size="2xl"
          color="brand.purple.600"
          mb={4}
        >
          Welcome to My Website
        </Heading>
        <Text fontSize="xl" color="gray.600">
          This is a placeholder for the new React-based website
        </Text>
      </Box>
      
      <Box
        p={8}
        border="2px solid"
        borderColor="black"
        boxShadow="4px 4px 0px 0px"
        bg="white"
      >
        <Text>
          The new website structure is being built. This will include:
        </Text>
        <VStack align="start" mt={4} spacing={2}>
          <Text>• Homepage with overview and featured research</Text>
          <Text>• Research archive with papers and projects</Text>
          <Text>• About page with better structure</Text>
          <Text>• Media appearances archive</Text>
          <Text>• Contact form</Text>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Home
