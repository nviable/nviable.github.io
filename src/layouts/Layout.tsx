import { Box, Container } from '@chakra-ui/react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box as="main" flex="1" py={8}>
        <Container maxW="container.xl" px={4}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
