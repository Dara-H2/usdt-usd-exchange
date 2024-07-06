// pages/dashboard.js

'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Input, FormControl, FormLabel, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

const Dashboard = () => {
  const [listings, setListings] = useState([])
  const [usdtAmount, setUsdtAmount] = useState('')
  const [usdAmount, setUsdAmount] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('USDT')

  const userId = 'user_id_here' // Replace with actual user ID after login integration

  useEffect(() => {
    const fetchListings = async () => {
      const response = await axios.get(`http://localhost:5000/api/listings/${userId}`)
      setListings(response.data)
    }
    fetchListings()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const listing = { userId, type, amount: type === 'USDT' ? usdtAmount : usdAmount, price }
      const response = await axios.post('http://localhost:5000/api/listings', listing)
      setListings([...listings, response.data])
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <Navbar />
      <Box p="8">
        <Heading mb="6">Customer Dashboard</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="type" mb="4">
            <FormLabel>Type</FormLabel>
            <Input as="select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="USDT">USDT</option>
              <option value="USD">USD</option>
            </Input>
          </FormControl>
          {type === 'USDT' ? (
            <FormControl id="usdtAmount" mb="4">
              <FormLabel>USDT Amount</FormLabel>
              <Input type="number" value={usdtAmount} onChange={(e) => setUsdtAmount(e.target.value)} />
            </FormControl>
          ) : (
            <FormControl id="usdAmount" mb="4">
              <FormLabel>USD Amount</FormLabel>
              <Input type="number" value={usdAmount} onChange={(e) => setUsdAmount(e.target.value)} />
            </FormControl>
          )}
          <FormControl id="price" mb="4">
            <FormLabel>Price</FormLabel>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Submit</Button>
        </form>

        <Heading mt="8" mb="4">Your Listings</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Amount</Th>
              <Th>Price</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listings.map((listing) => (
              <Tr key={listing._id}>
                <Td>{listing.type}</Td>
                <Td>{listing.amount}</Td>
                <Td>{listing.price}</Td>
                <Td>{listing.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  )
}

export default Dashboard
