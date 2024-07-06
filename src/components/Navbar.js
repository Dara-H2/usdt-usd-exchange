// components/Navbar.js
import { Flex, Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Navbar = () => (
  <Flex as="nav" p="4" bg="blue.500" color="white">
    <Box mx="2">
      <NextLink href="/" passHref>
        <Link>Home</Link>
      </NextLink>
    </Box>
    <Box mx="2">
      <NextLink href="/login" passHref>
        <Link>Login</Link>
      </NextLink>
    </Box>
    <Box mx="2">
      <NextLink href="/dashboard" passHref>
        <Link>Dashboard</Link>
      </NextLink>
    </Box>
  </Flex>
)

export default Navbar
