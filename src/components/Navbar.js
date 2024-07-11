// components/Navbar.js
'uses client'
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      name :"home",
      link: "/",
    },
    {
      id: 2,
      link: "dashboard",
      name:"Dashboard",
    },
    
    {
      id: 4,
      link: "login",
      name:"Login",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            // target="_blank"
            rel="noreferrer"
          >
            L
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link ,name}) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link ,name}) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
// import { useState } from 'react'

// function NavLink({to, children}) {
//     return <a href={to} className={`mx-4`}>
//         {children}
//     </a>
// }

// function MobileNav({open, setOpen}) {
//     return (
//         <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
//             <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
//                 <a className="text-xl font-semibold" href="/">LOGO</a>
//             </div>
//             <div className="flex flex-col ml-4">
//                 <a className="text-xl font-medium my-4" href="/about" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
//                     About
//                 </a>
//                 <a className="text-xl font-normal my-4" href="/contact" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
//                     Contact
//                 </a>
//             </div>  
//         </div>
//     )
// }

// export default function Navbar() {
    
//     const [open, setOpen] = useState(false)
//     return (
//         <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
//             <MobileNav open={open} setOpen={setOpen}/>
//             <div className="w-3/12 flex items-center">
//                 <a className="text-2xl font-semibold" href="/">LOGO</a>
//             </div>
//             <div className="w-9/12 flex justify-end items-center">

//                 <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
//                     setOpen(!open)
//                 }}>
//                     {/* hamburger button */}
//                     <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
//                     <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
//                     <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
//                 </div>

//                 <div className="hidden md:flex">
//                     <NavLink to="/contact">
//                         CONTACT
//                     </NavLink>
//                     <NavLink to="/about">
//                         ABOUT
//                     </NavLink>
//                 </div>
//             </div>
//         </nav>
//     )
// }