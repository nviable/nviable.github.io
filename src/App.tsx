import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Research from './pages/Research'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import MediaArchive from './pages/MediaArchive'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:projectSlug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/media" element={<MediaArchive />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  )
}

export default App
