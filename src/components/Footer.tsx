import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: 'mailto:john@nviable.me', label: 'Email' },
    { icon: Github, href: 'https://github.com/nviable', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/johnsohrawardi', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/nviable', label: 'Twitter' },
  ]

  return (
    <Box
      as="footer"
      bg="gray.100"
      borderTop="2px solid"
      borderColor="black"
      py={8}
      mt="auto"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        gap={4}
      >
        <Text fontSize="sm" color="gray.600">
          © 2024 John Sohrawardi. All rights reserved.
        </Text>

        <Flex gap={4}>
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              isExternal
              _hover={{ color: 'brand.purple.600' }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={social.icon} boxSize={4} />
              <Text fontSize="sm">{social.label}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
