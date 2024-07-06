'use client'
import { useState } from 'react'
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react'
import AuthLayout
 from '@/components/AuthLayout'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login logic
  }

  return (
    <AuthLayout>
      <Heading mb="6">Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb="4">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">Login</Button>
      </form>
    </AuthLayout>
  )
}

export default Login
