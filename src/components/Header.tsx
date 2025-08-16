import { Box, Flex, Link, Button, useColorMode } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Header() {
  return (
    <Box as="header" bg="white" borderBottom="1px" borderColor="gray.200" px={4} py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold" color="brand.purple.600">
          Nviable
        </Link>

        <Flex as="nav" gap={6}>
          <Link as={RouterLink} to="/" color="gray.700" _hover={{ color: 'brand.purple.600' }}>
            Home
          </Link>
          <Link as={RouterLink} to="/research" color="gray.700" _hover={{ color: 'brand.purple.600' }}>
            Research
          </Link>
          <Link as={RouterLink} to="/about" color="gray.700" _hover={{ color: 'brand.purple.600' }}>
            About
          </Link>
          <Link as={RouterLink} to="/media" color="gray.700" _hover={{ color: 'brand.purple.600' }}>
            Media
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
