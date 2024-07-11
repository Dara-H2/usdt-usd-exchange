// // src/pages/register.js
// "use client"
// import { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
// import Navbar from '@/components/Navbar';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [Phonenumber, setPhonenumber] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', { name, Phonenumber, password });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Box p="8">
//         <Heading mb="6">Register</Heading>
//         <form onSubmit={handleSubmit}>
//           <FormControl id="name" mb="4">
//             <FormLabel>Name</FormLabel>
//             <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           </FormControl>
//           <FormControl id="Phonenumebr" mb="4">
//             <FormLabel>Phonenumber</FormLabel>
//             <Input type="tel" value={Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
//           </FormControl>
//           <FormControl id="password" mb="4">
//             <FormLabel>Password</FormLabel>
//             <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </FormControl>
//           <Button type="submit" colorScheme="blue" width="full">Register</Button>
//         </form>
//       </Box>
//     </div>
//   );
// };

// export default Register;

// src/pages/register.js
"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter
 } from 'next/navigation';
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';

const Register = () => {
  const [name, setName] = useState('');
//   const [email, setEmail] = useState(''); // Added email field
  const [Phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Added role field
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, Phonenumber, password, role });
      console.log(response.data);
      router.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <Box p="8">
        <Heading mb="6">Register</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb="4">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          {/* <FormControl id="email" mb="4"> 
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl> */}
          <FormControl id="Phonenumber" mb="4">
            <FormLabel>Phonenumber</FormLabel>
            <Input type="tel" value={Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
          </FormControl>
          <FormControl id="password" mb="4">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl id="role" mb="4"> {/* Added role selection */}
            <FormLabel>Role</FormLabel>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="operator">Operator</option>
            </select>
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Register</Button>
        </form>
      </Box>
    </div>
  );
};

export default Register;

