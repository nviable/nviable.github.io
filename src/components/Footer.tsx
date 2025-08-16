import { Box, Flex, Text, Link, Icon, VStack, SimpleGrid, FormControl, FormLabel, Input, Textarea, Button, useToast, Heading } from '@chakra-ui/react'
import { LuMail, LuGithub, LuLinkedin, LuTwitter } from 'react-icons/lu'

const Footer = () => {
  const toast = useToast();
  const socialLinks = [
    { icon: LuMail, href: 'mailto:john@nviable.me', label: 'Email' },
    { icon: LuGithub, href: 'https://github.com/nviable', label: 'GitHub' },
    { icon: LuLinkedin, href: 'https://linkedin.com/in/johnsohrawardi', label: 'LinkedIn' },
    { icon: LuTwitter, href: 'https://twitter.com/nviable', label: 'Twitter' },
  ]

  return (
    <Box as="footer" bg="gray.100" borderTop="2px solid" borderColor="black" py={8} mt="auto">
      <SimpleGrid columns={{ base: 1, md: 2 }} maxW="container.xl" mx="auto" px={4} spacing={8}>
        {/* Left Column: Copyright and Form */}
        <VStack align="stretch" spacing={8}>
          <Text fontSize="sm" color="gray.600">© 2024 John Sohrawardi. All rights reserved.</Text>
          <Box>
            <Heading as="h4" size="md" mb={4}>Get in Touch</Heading>
            <form onSubmit={(e) => { e.preventDefault(); toast({ title: 'Message sent!', status: 'success', duration: 3000 }); }}>
              <VStack spacing={4}>
                <SimpleGrid columns={2} spacing={4} width="full">
                  <FormControl><FormLabel>Name</FormLabel><Input required /></FormControl>
                  <FormControl><FormLabel>Email</FormLabel><Input type="email" required /></FormControl>
                </SimpleGrid>
                <FormControl><FormLabel>Message</FormLabel><Textarea required /></FormControl>
                <Button type="submit" colorScheme="brand.purple" alignSelf="flex-start">Send Message</Button>
              </VStack>
            </form>
          </Box>
        </VStack>

        {/* Right Column: Site Links and Socials */}
        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading as="h4" size="md" mb={4}>Site Links</Heading>
            <VStack align="start" spacing={2}>
              <Link href="/" _hover={{ color: 'brand.purple.600' }}>Home</Link>
              <Link href="/about" _hover={{ color: 'brand.purple.600' }}>About</Link>
              <Link href="/research" _hover={{ color: 'brand.purple.600' }}>Research</Link>
              <Link href="/media" _hover={{ color: 'brand.purple.600' }}>Media</Link>
            </VStack>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={4}>Connect</Heading>
            <Flex gap={4}>
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} isExternal _hover={{ color: 'brand.purple.600' }} display="flex" alignItems="center" gap={2}>
                  <Icon as={social.icon} boxSize={4} />
                  <Text fontSize="sm">{social.label}</Text>
                </Link>
              ))}
            </Flex>
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  )
}

export default Footer
