// // src/pages/login.js
// "use client"
// import { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
// import Navbar from '@/components/Navbar';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Box p="8">
//         <Heading mb="6">Login</Heading>
//         <form onSubmit={handleSubmit}>
//           <FormControl id="email" mb="4">
//             <FormLabel>Email</FormLabel>
//             <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </FormControl>
//           <FormControl id="password" mb="4">
//             <FormLabel>Password</FormLabel>
//             <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </FormControl>
//           <Button type="submit" colorScheme="blue" width="full">Login</Button>
//         </form>
//       </Box>
//     </div>
//   );
// };

// export default Login;
// src/pages/login.js
"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';

const Login = () => {
  const [Phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { Phonenumber, password });
      const { token,userId,role } = response.data;
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);
      localStorage.setItem('token',token);

      if (role === 'operator') {
        router.push('/operator');
      } else {
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <Box p="8">
        <Heading mb="6">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="Phonenumber" mb="4">
            <FormLabel>Phonenumber</FormLabel>
            <Input type="tel" value={Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
          </FormControl>
          <FormControl id="password" mb="4">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Login</Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
