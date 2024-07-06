// components/AuthLayout.js
'use client'
import { Box, Flex } from '@chakra-ui/react'

const AuthLayout = ({ children }) => (
  <Flex align="center" justify="center" h="100vh">
    <Box w="400px" p="8" borderWidth="1px" borderRadius="md">
      {children}
    </Box>
  </Flex>
)

export default AuthLayout
