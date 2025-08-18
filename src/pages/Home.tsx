import { Box, Heading, Text, VStack, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import ProjectCard from '../components/content/ProjectCard'
import PublicationItem from '../components/content/PublicationItem'
import { fetchProjects, fetchPublications, fetchMediaAppearances } from '../lib/sanity'
import { useEffect, useState } from 'react'
import type { Project, Publication, MediaAppearance } from '../types/content'
// Import motion and icons
import { motion } from 'framer-motion'
import { Brain, Code2, Shield, Users, Gamepad2 } from 'lucide-react'
// Import new component
import LabeledPills from '../components/ui/LabeledPills'
// Import Link
import { Link } from 'react-router-dom'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

// Define AnimatedLink
const AnimatedLink = motion(Link)

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [media, setMedia] = useState<MediaAppearance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [proj, pub, med] = await Promise.all([
          fetchProjects(),
          fetchPublications(),
          fetchMediaAppearances()
        ])
        setProjects(proj.slice(0, 3))
        setPublications(pub.slice(0, 2))
        setMedia(med.slice(0, 2))
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <VStack spacing={16} align="stretch" px={4} py={12} bg="brand.gray">
        <LoadingSkeleton type="grid" count={3} />
        <LoadingSkeleton type="grid" count={2} />
        <LoadingSkeleton type="list" count={2} />
      </VStack>
    )
  }

  return (
    <VStack spacing={16} align="stretch" px={4} py={12} bg="brand.gray">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box textAlign="center" py={12} bg="white" borderRadius="lg" p={8} boxShadow="md">
          <Heading as="h1" size="3xl" mb={4}>Hey there! I'm John (Saniat Sohrawardi)</Heading>
          <Text fontSize="xl" mb={6}>A PhD candidate who's journeyed from Ukraine and Bangladesh to US labs—all in the name of making the digital world a safer, smarter place. From busting deepfakes to pondering AI ethics, my mission is simple: leave this place better than I found it.</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <AnimatedLink to="/about" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ background: 'brand.blue', color: 'white', padding: '12px 24px', borderRadius: 'md', fontWeight: 'bold', display: 'inline-block' }}>Dive into My World →</AnimatedLink>
            <AnimatedLink to="/research" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ background: 'brand.blue', color: 'white', padding: '12px 24px', borderRadius: 'md', fontWeight: 'bold', display: 'inline-block' }}>Explore Research →</AnimatedLink>
            <AnimatedLink to="/research" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ background: 'brand.blue', color: 'white', padding: '12px 24px', borderRadius: 'md', fontWeight: 'bold', display: 'inline-block' }}>View Publications →</AnimatedLink>
          </SimpleGrid>
        </Box>
      </motion.div>

      {/* Research Highlights */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Box>
          <Heading as="h2" size="xl" mb={6}>Research Highlights</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {projects.map((project, idx) => (
              <motion.div key={project._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </SimpleGrid>
          <AnimatedLink to="/research" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ marginTop: '1.5rem', border: `1px solid brand.blue`, color: 'brand.blue', padding: '12px 24px', borderRadius: 'md', fontWeight: 'bold', display: 'inline-block' }}>View All Projects →</AnimatedLink>
        </Box>
      </motion.div>

      {/* Latest Publications */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Box>
          <Heading as="h2" size="xl" mb={6}>Latest Publications</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {publications.map((pub, idx) => (
              <motion.div key={pub._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <PublicationItem publication={pub} />
              </motion.div>
            ))}
          </SimpleGrid>
          <AnimatedLink to="/research" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ marginTop: '1.5rem', border: `1px solid brand.blue`, color: 'brand.blue', padding: '12px 24px', borderRadius: 'md', fontWeight: 'bold', display: 'inline-block' }}>View All Publications →</AnimatedLink>
        </Box>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Box>
          <Heading as="h2" size="xl" mb={6}>Skills & Expertise</Heading>
          {/* Update Skills accordion with resume data */}
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton><Box mr={2}><Brain /></Box> Research <AccordionIcon /></AccordionButton>
              <AccordionPanel>
                <VStack align="start" spacing={4}>
                  <LabeledPills label="Methods" items={['Qualitative user studies', 'Usability testing', 'A/B testing & data analysis', 'Survey design & analysis']} />
                  <LabeledPills label="Activities" items={['Academic writing & research publication', 'Project management', 'Team leadership & mentorship', 'Workshop/panel presentations']} />
                  <LabeledPills label="Tools" items={['Prototyping', 'Qualtrics', 'ReVISit']} />
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton><Box mr={2}><Code2 /></Box> Technical <AccordionIcon /></AccordionButton>
              <AccordionPanel>
                <VStack align="start" spacing={4}>
                  <LabeledPills label="Programming" items={['Python', 'JavaScript', 'TypeScript', 'PHP', 'HTML', 'CSS', 'SQL']} />
                  <LabeledPills label="Machine Learning" items={['Lightning', 'Pytorch', 'Keras', 'TensorFlow']} />
                  <LabeledPills label="Web Development" items={['ReactJS', 'NextJS', 'ExpressJS', 'Flask', 'FeathersJS', 'Docker']} />
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton><Box mr={2}><Users /></Box> Design Skills <AccordionIcon /></AccordionButton>
              <AccordionPanel>
                <VStack align="start" spacing={4}>
                  <LabeledPills label="Methods" items={['UX design', 'Responsive UI design', 'Prototyping', 'Wireframing', 'Information flow', 'Interaction design']} />
                  <LabeledPills label="Tools" items={['Figma', 'Moqups', 'Balsamiq', 'Adobe Creative Suite']} />
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton><Box mr={2}><Shield /></Box> Other Skills <AccordionIcon /></AccordionButton>
              <AccordionPanel>
                <LabeledPills label="Skills" items={['Project management', 'Team leadership & mentorship', 'Conference Organization', 'Workshop Organization']} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton><Box mr={2}><Gamepad2 /></Box> Gamification & eSports <AccordionIcon /></AccordionButton>
              <AccordionPanel>
                <VStack align="start" spacing={4}>
                  <LabeledPills label="Gamification" items={['User Engagement', 'Simulated Training']} />
                  <LabeledPills label="eSports" items={['Team Management', 'Strategy Development', 'Tournament Organization']} />
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </motion.div>

      {/* Media Mentions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <Box>
          <Heading as="h2" size="xl" mb={6}>Media Mentions</Heading>
          <VStack spacing={8}>
            {media.map((m, idx) => (
              <motion.div key={m._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Box p={6} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
                  <Text fontSize="lg" fontStyle="italic">"{m.description}"</Text>
                  <Text mt={2} fontWeight="bold">{m.outlet} - {new Date(m.date).toLocaleDateString()}</Text>
                </Box>
              </motion.div>
            ))}
          </VStack>
          <AnimatedLink to="/media" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} style={{ marginTop: '1.5rem', border: `1px solid brand.blue`, color: 'brand.blue', padding: '12px 24px', borderRadius: 'md', fontWeight: 'bold', display: 'inline-block' }}>View All Media →</AnimatedLink>
        </Box>
      </motion.div>
    </VStack>
  )
}

export default Home
