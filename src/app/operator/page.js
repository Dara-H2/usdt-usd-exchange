// // pages/operator.js
// 'use client'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
// import Navbar from '@/components/Navbar'

// const OperatorDashboard = () => {
//   const [listings, setListings] = useState([])

//   useEffect(() => {
//     const fetchListings = async () => {
//       const response = await axios.get('http://localhost:5000/api/listings')
//       setListings(response.data)
//     }
//     fetchListings()
//   }, [])

//   const handleMatch = async (listingId) => {
//     try {
//       const response = await axios.patch(`http://localhost:5000/api/listings/${listingId}`, { status: 'Matched' })
//       setListings(listings.map((listing) => listing._id === listingId ? response.data : listing))
//     } catch (error) {
//       console.error(error.response.data)
//     }
//   }

//   return (
//     <div>
//       <Navbar />
//       <Box p="8">
//         <Heading mb="6">Operator Dashboard</Heading>
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Customer</Th>
//               <Th>Type</Th>
//               <Th>Amount</Th>
//               <Th>Price</Th>
//               <Th>Status</Th>
//               <Th>Action</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {listings.map((listing) => (
//               <Tr key={listing._id}>
//                 <Td>{listing.userId.email}</Td>
//                 <Td>{listing.type}</Td>
//                 <Td>{listing.amount}</Td>
//                 <Td>{listing.price}</Td>
//                 <Td>{listing.status}</Td>
//                 <Td>
//                   {listing.status === 'Pending' && (
//                     <Button colorScheme="blue" onClick={() => handleMatch(listing._id)}>Match</Button>
//                   )}
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>
//     </div>
//   )
// }

// export default OperatorDashboard


// src/pages/operator/dashboard.js
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const OperatorDashboard = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'operator') {
      router.push('/login'); // or wherever you want to redirect unauthorized users
    }
  }, [router]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <Box p="8">
        <Heading mb="6">Operator Dashboard</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Role</Th>
              <Th>Listings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.Phonenumber}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Type</Th>
                        <Th>Amount</Th>
                        <Th>Price</Th>
                        <Th>Status</Th>
                        <Th>Created At</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {user.listings.map((listing) => (
                        <Tr key={listing._id}>
                          <Td>{listing.type}</Td>
                          <Td>{listing.amount}</Td>
                          <Td>{listing.price}</Td>
                          <Td>{listing.status}</Td>
                          <Td>{new Date(listing.createdAt).toLocaleString()}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default OperatorDashboard;
