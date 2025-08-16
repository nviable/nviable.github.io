import { Box, Heading, Text, VStack, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, List, ListItem } from '@chakra-ui/react'
import ProjectCard from '../components/content/ProjectCard'
import PublicationItem from '../components/content/PublicationItem'
import MediaItem from '../components/content/MediaItem'
import { fetchProjects, fetchPublications, fetchMediaAppearances } from '../lib/sanity'
import { useEffect, useState } from 'react'
import type { Project, Publication, MediaAppearance } from '../types/content'

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [media, setMedia] = useState<MediaAppearance[]>([])

  useEffect(() => {
    const loadData = async () => {
      const [proj, pub, med] = await Promise.all([
        fetchProjects(),
        fetchPublications(),
        fetchMediaAppearances()
      ])
      setProjects(proj.slice(0, 3))
      setPublications(pub.slice(0, 2))
      setMedia(med.slice(0, 2))
    }
    loadData()
  }, [])

  return (
    <VStack spacing={12} align="stretch">
      {/* Hero Section */}
      <Box textAlign="center" py={12} bg="brand.yellow.100" borderRadius="lg" p={8}>
        <Heading as="h1" size="2xl" mb={4}>
          Hey there! I'm John (Saniat Sohrawardi)
        </Heading>
        <Text fontSize="xl" mb={6}>
          A PhD candidate who's journeyed from Ukraine and Bangladesh to US labs—all in the name of making the digital world a safer, smarter place. From busting deepfakes to pondering AI ethics, my mission is simple: leave this place better than I found it.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Button as="a" href="/about" colorScheme="brand.purple">Dive into My World →</Button>
          <Button as="a" href="/research" colorScheme="brand.purple">Explore Research →</Button>
          <Button as="a" href="/research" colorScheme="brand.purple">View Publications →</Button> {/* Adjust if separate page */}
        </SimpleGrid>
      </Box>

      {/* Latest Publications */}
      <Box>
        <Heading as="h2" size="xl" mb={6}>Latest Publications</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {publications.map(pub => <PublicationItem key={pub._id} publication={pub} />)}
        </SimpleGrid>
        <Button mt={6} as="a" href="/research" variant="outline" colorScheme="brand.purple">View All Publications →</Button>
      </Box>

      {/* Projects Section */}
      <Box>
        <Heading as="h3" size="lg" mb={6}>Projects</Heading>
        {projects.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <ProjectCard project={projects[0]} /> {/* Large in col1 */}
            <VStack spacing={6}>
              <ProjectCard project={projects[1]} />
              <ProjectCard project={projects[2]} />
            </VStack>
          </SimpleGrid>
        )}
        <Button mt={6} as="a" href="/research" variant="outline" colorScheme="brand.purple">View All Projects →</Button>
      </Box>

      {/* Skills Section */}
      <Box>
        <Heading as="h2" size="xl" mb={6}>Skills</Heading>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton><Box flex="1" textAlign="left">Research & Analysis</Box><AccordionIcon /></AccordionButton>
            <AccordionPanel>
              <List spacing={1}>
                <ListItem>Methodologies: Qualitative Research, Mixed-Methods Studies, Bias and Ethics Analysis</ListItem>
                <ListItem>Tools: Data Collection (Surveys, Interviews, ReVISit, Qualtrics), Statistical Analysis, Thematic Coding</ListItem>
                <ListItem>Applications: Deepfake Detection Research, Cross-Cultural Studies, Policy Recommendation Development</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton><Box flex="1" textAlign="left">AI & ML</Box><AccordionIcon /></AccordionButton>
            <AccordionPanel>
              <List spacing={1}>
                <ListItem>Machine Learning: Model Training, Evaluation, Hyperparameter Tuning</ListItem>
                <ListItem>Deep Learning: Neural Networks, Convolutional Neural Networks, Recurrent Neural Networks</ListItem>
                <ListItem>Applications: Deepfake Detection, Anomaly Detection, Image Classification</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton><Box flex="1" textAlign="left">Product Management & Design</Box><AccordionIcon /></AccordionButton>
            <AccordionPanel>
              <List spacing={1}>
                <ListItem>Design Thinking: User-Centered Design, Prototyping, Iterative Design</ListItem>
                <ListItem>Product Strategy: Market Research, User Personas, User Stories, Feature Prioritization</ListItem>
                <ListItem>Applications: User Interface Design, Product Roadmap Development</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton><Box flex="1" textAlign="left">Security & Integrity</Box><AccordionIcon /></AccordionButton>
            <AccordionPanel>
              <List spacing={1}>
                <ListItem>Ethics: AI Bias, Privacy, Security, Transparency</ListItem>
                <ListItem>Security: Cryptography, Authentication, Access Control, Data Protection</ListItem>
                <ListItem>Applications: Deepfake Detection, Data Integrity, Secure Communication</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton><Box flex="1" textAlign="left">Gaming & Fun</Box><AccordionIcon /></AccordionButton>
            <AccordionPanel>
              <List spacing={1}>
                <ListItem>Game Theory: Nash Equilibrium, Prisoner's Dilemma, Multi-Agent Systems</ListItem>
                <ListItem>Game Design: Puzzle Games, Strategy Games, Interactive Fiction</ListItem>
                <ListItem>Applications: AI-Powered Game Development, Interactive Storytelling</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      {/* Latest Media Appearances */}
      <Box>
        <Heading as="h2" size="xl" mb={6}>Latest Media Appearances</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {media.map(m => <MediaItem key={m._id} media={m} />)}
        </SimpleGrid>
        <Button mt={6} as="a" href="/media" variant="outline" colorScheme="brand.purple">View All Media →</Button>
      </Box>
    </VStack>
  )
}

export default Home
