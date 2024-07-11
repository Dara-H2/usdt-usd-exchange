// "use client"
// import Navbar from '../components/Navbar'
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// export default function Home() {
//   const router = useRouter();
//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (role === 'user') {
//       router.push('/dashboard');
//     } else if (role === 'operator') {
//       router.push('/operator');
//     } else {
//       router.push('/login');
//     }
//   }, [router]);
//   return (
//     <div>
//       <Navbar />
//     </div>
    
//   );
// }



// src/pages/index.js
"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'user') {
      router.push('/dashboard');
    } else if (role === 'operator') {
      router.push('/operator');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>


      
      <Navbar />
      
    </div>
  );
}


