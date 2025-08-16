import { Box, Container, Heading, Text, VStack, Image, Link, Button, List, ListItem } from '@chakra-ui/react'
import Breadcrumbs from '../components/Breadcrumbs'
import john from '../assets/john.jpg'

export default function About() {
  return (
    <Container maxW="container.xl" py={8}>
      <Breadcrumbs items={[{ label: 'About' }]} />

      <VStack spacing={12} align="stretch">
        {/* Hero Bio */}
        <Box textAlign="center">
          <Image
            src={john}
            alt="John (Saniat Sohrawardi)"
            borderRadius="full"
            boxSize="200px"
            mx="auto"
            mb={6}
          />
          <Heading as="h1" size="2xl" mb={4}>
            From Dhaka Labs to Rochester Research: My Journey in Tech
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Born in Ukraine, schooled in Russia and Bangladesh, and now PhD-ing in the US—I've collected more stamps in my passport than bugs in my code. Married since 2022, with the most polite cat named Kyubi who thinks he's the real researcher here. My ethos? Leave this place better than you found it.
          </Text>
        </Box>

        {/* Professional Journey */}
        <Box>
          <Heading as="h2" size="xl" mb={6}>
            Professional Journey
          </Heading>
          <VStack spacing={8} align="stretch">
            {/* RIT */}
            <Box>
              <Heading as="h3" size="lg">Graduate Researcher</Heading>
              <Text fontWeight="bold">Rochester Institute of Technology | Rochester, NY</Text>
              <Text fontStyle="italic" color="gray.500">Aug 2018 – Oct 2025 (expected)</Text>
              <List spacing={2} pl={4} mt={2}>
                <ListItem>Lead researcher and founder of the DeFake project, growing the project into an interdisciplinary team of ~18 researchers collaborating across 4 universities.</ListItem>
                <ListItem>Project manager for the various sub-projects of the DeFake, handling tasks, goals, and project timelines across the team.</ListItem>
                <ListItem>Designed and carried out qualitative user studies with journalists and students with publications in CHI, USENIX, SOUPS, CCS, and C+J.</ListItem>
                <ListItem>Developed deep learning models for deepfake detection, achieving state-of-the-art accuracies at the time of publication.</ListItem>
              </List>
            </Box>

            {/* Boomerang Digital */}
            <Box>
              <Heading as="h3" size="lg">Senior Web Developer</Heading>
              <Text fontWeight="bold">Boomerang Digital | Dhaka, Bangladesh</Text>
              <Text fontStyle="italic" color="gray.500">Nov 2014 – Aug 2016 & Aug 2017 – Aug 2018</Text>
              <List spacing={2} pl={4} mt={2}>
                <ListItem>Collaborated on a qualitative user research study with Norman & Nielsen, analyzed the findings, and used them to design the national health portal user experience and interface.</ListItem>
                <ListItem>Designed UX and responsive UI for Telenor Health public health and lifestyle portal serving a user-base of ~173m.</ListItem>
                <ListItem>Led and mentored a team of 4 developers on successful custom CMS-based web projects for local and foreign clients.</ListItem>
              </List>
            </Box>

            {/* Chaldal Limited */}
            <Box>
              <Heading as="h3" size="lg">Software Engineer</Heading>
              <Text fontWeight="bold">Chaldal Limited | Dhaka, Bangladesh</Text>
              <Text fontStyle="italic" color="gray.500">Aug 2016 – June 2017</Text>
              <List spacing={2} pl={4} mt={2}>
                <ListItem>Designed and developed the online grocery website’s coupon management page.</ListItem>
                <ListItem>Designed and executed usability research on Chaldal’s order making and scheduling platform to improve customer experience.</ListItem>
                <ListItem>Deployed an A/B testing and analytics framework to evaluate the website and the user experience of order scheduling pathways.</ListItem>
              </List>
            </Box>
          </VStack>
        </Box>

        {/* Current Focus */}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Current Focus
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Wrapping up my PhD, I'm seeking roles as a Research Scientist, UX Researcher, Qualitative Researcher, Product Manager/Designer, or Consultant in HCI/AI/Ethics. Let's mix disciplines to innovate with purpose—whether it's designing intuitive AI tools or advising on ethical tech policies. After all, leaving the world better means applying research to real-world impact.
          </Text>
        </Box>

        {/* Personal Side */}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Personal Side
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            When not coding, I'm:
          </Text>
          <List spacing={2} pl={4}>
            <ListItem>Losing my rank in Valorant (thank God I quit DotA)</ListItem>
            <ListItem>Playing football/tennis (competitively, of course)</ListItem>
            <ListItem>Spoiling Kyubi with new toys</ListItem>
            <ListItem>Planning ways to make tech more inclusive</ListItem>
          </List>
          <Box mt={6} display="flex" justifyContent="center" gap={4}>
            <Button as={Link} href="/cv.pdf" download colorScheme="brand.purple">
              Download CV
            </Button>
            <Button as={Link} href="/resume.pdf" download colorScheme="brand.purple">
              Download Resume
            </Button>
            <Button as={Link} href="https://www.linkedin.com/in/sohrawardi/" isExternal colorScheme="brand.purple">
              Connect on LinkedIn
            </Button>
          </Box>
        </Box>
      </VStack>
    </Container>
  )
}
