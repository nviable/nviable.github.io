import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/research', label: 'Research' },
    { path: '/about', label: 'About' },
    { path: '/media', label: 'Media' },
  ]

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="2px solid"
      borderColor="black"
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        py={4}
        align="center"
        justify="space-between"
      >
        <RouterLink to="/">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="brand.purple.600"
            _hover={{ color: 'brand.purple.700' }}
            cursor="pointer"
          >
            John Sohrawardi
          </Text>
        </RouterLink>

        <Flex gap={4} align="center">
          {navItems.map((item) => (
            <RouterLink key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'solid' : 'outline'}
                size="sm"
                borderRadius="0"
              >
                {item.label}
              </Button>
            </RouterLink>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
