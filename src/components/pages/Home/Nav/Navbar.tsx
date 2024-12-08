
"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa"; 
import { useAppSelector } from "@/redux/hook";
import Cart from "../Cart/Cart";
import { FaRegHeart } from "react-icons/fa6";
import { useLoggedUserQuery } from "@/redux/api/userApi";


const Navbar = () => {
  const { data } = useLoggedUserQuery(undefined);
  const user = data?.data;
 
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); 
  const favouriteServices = useAppSelector((state: any) => state.favourites.favouriteServices); 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Service" },
    { href: "/providers", label: "Providers" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className=" px-6 md:px-[4rem] hidden md:block main ">
        <div className="md:mx-0">
          <div className="flex items-center justify-between h-16">
            {/* Navigation Links */}
            <div className="hidden md:flex flex-1 justify-start">
              <ul className="flex space-x-6 font-medium">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-black hover:text-indigo-500 py-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          
            <div className="hidden md:flex items-center space-x-6">
              <div
                className="relative flex items-center p-3 bg-[#f8fcfd] rounded-full cursor-pointer"
                onClick={toggleSidebar} 
              >
               {favouriteServices.length === 0 ?  <FaRegHeart className="text-indigo-600 text-xl hover:scale-105 transition-transform" />:  <FaHeart className="text-indigo-600 text-xl hover:scale-105 transition-transform" />}
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {favouriteServices.length}
                </span>
              </div>

              
  {!user ? ( // If there's no user, show both links
    <>
      <Link href="/signup">
        <p className="text-black text-sm hover:text-indigo-600 font-medium m-0">
          Become A User
        </p>
      </Link>
      <Link href="/signup/provider">
        <p className="text-black text-sm hover:text-indigo-600 font-medium m-0">
          Become A Provider
        </p>
      </Link>
    </>
  ) : user.role === 'User' ? ( // If the user is a User, show only Become A Provider
    <Link href="/signup/provider">
      <p className="text-black text-sm hover:text-indigo-600 font-medium m-0">
        Become A Provider
      </p>
    </Link>
  ) : null} {/* If the user is a Provider, show nothing */}



            </div>
          </div>
        </div>
      </nav>

    
      {sidebarOpen && (
        <>
          <Cart services={favouriteServices} onClose={toggleSidebar} />
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar} // Close sidebar when clicking outside
          ></div>
        </>
      )}
    </>
  );
};

export default Navbar;
