// pages/operator.js
'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

const OperatorDashboard = () => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      const response = await axios.get('http://localhost:5000/api/listings')
      setListings(response.data)
    }
    fetchListings()
  }, [])

  const handleMatch = async (listingId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/listings/${listingId}`, { status: 'Matched' })
      setListings(listings.map((listing) => listing._id === listingId ? response.data : listing))
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <Navbar />
      <Box p="8">
        <Heading mb="6">Operator Dashboard</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Customer</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listings.map((listing) => (
              <Tr key={listing._id}>
                <Td>{listing.userId.email}</Td>
                <Td>{listing.type}</Td>
                <Td>{listing.amount}</Td>
                <Td>{listing.price}</Td>
                <Td>{listing.status}</Td>
                <Td>
                  {listing.status === 'Pending' && (
                    <Button colorScheme="blue" onClick={() => handleMatch(listing._id)}>Match</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  )
}

export default OperatorDashboard
