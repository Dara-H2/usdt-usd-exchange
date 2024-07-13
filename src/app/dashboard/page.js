'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Button, Input, FormControl, FormLabel, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [usdtAmount, setUsdtAmount] = useState('');
  const [tomanAmount, setTomanAmount] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('USDT');
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(0);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : '';

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        const userData = response.data;
        console.log('Fetched user data:', userData);
        setWalletAddress(userData.walletAddress || '');
        setBalance(userData.balance);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    // const fetchUserData = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
    //       headers: {
    //         'x-auth-token': token,
    //       },
    //     });
    //     const userData = response.data;
    //     console.log('Fetched user data:', userData); // Add logging
    //     setWalletAddress(userData.walletAddress || '');
    //     setBalance(userData.balance || 0);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };

    const fetchListings = async () => {
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/listings`, {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log('API Response:', response.data);
        setListings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      }
    };
    fetchUserData();
    fetchListings();
  }, [userId, token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listing = { type, amount: type === 'USDT' ? usdtAmount : tomanAmount, price };
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/listings`, listing, {
        headers: {
          'x-auth-token': token,
        },
      });

      if (Array.isArray(listings)) {
        setListings([...listings, response.data]);
      } else {
        setListings([response.data]);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    router.push('/login');
  };
  

  return (
    <div>
      <Navbar />
      <Box p="8">
        <Heading mb="6">Customer Dashboard</Heading>
        <Button onClick={handleLogout} colorScheme="red" mb="4">Logout</Button>
        <div mb="4">Wallet Address: {walletAddress}</div>
        <div mb="4">Balance: {balance} USDT</div>
        <form onSubmit={handleSubmit}>
          <FormControl id="type" mb="4">
            <FormLabel>Type</FormLabel>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="USDT">USDT</option>
              <option value="Toman">Toman</option>
            </select>
          </FormControl>
          {type === 'USDT' ? (
            <FormControl id="usdtAmount" mb="4">
              <FormLabel>USDT Amount</FormLabel>
              <Input type="number" value={usdtAmount} onChange={(e) => setUsdtAmount(e.target.value)} />
            </FormControl>
          ) : (
            <FormControl id="TomanAmount" mb="4">
              <FormLabel>Toman Amount</FormLabel>
              <Input type="number" value={tomanAmount} onChange={(e) => setTomanAmount(e.target.value)} />
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
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(listings) && listings.map((listing) => (
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
      </Box>
    </div>
  );
};

export default Dashboard;

