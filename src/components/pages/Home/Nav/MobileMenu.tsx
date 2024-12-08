"use client";
import {
  FaSignOutAlt,
  FaUser,
  FaCalendarCheck,
  FaHeart,
  FaTachometerAlt,
  FaRegHeart,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import {
  FiChevronDown,
  FiLogIn,
  FiMenu,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { useAppSelector } from "@/redux/hook";
import Cart from "../Cart/Cart";

const MobileMenu = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>(
    {}
  );
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  const favouriteServices = useAppSelector(
    (state: any) => state.favourites.favouriteServices
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);
  const handleSignOut = async () => {
    await signOut();
    setIsProfileOpen(false);
  };
  useClickAway(profileMenuRef, () => setIsProfileOpen(false));

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = (linkIndex: number) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [linkIndex]: !prevState[linkIndex] || false,
    }));
  };

  const userRole = user?.role;

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Providers", href: "/providers" },
    { title: "Blog", href: "/blogs" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];
  const profileDropdownItems =
    userRole === "User"
      ? [
          { title: "Profile", href: "/profile/user", icon: <FaUser /> },
          {
            title: "Booking",
            href: "/profile/booking",
            icon: <FaCalendarCheck />,
          },
          {
            title: "Favourites",
            href: "/profile/favourites",
            icon: <FaHeart />,
          },
          { title: "Logout", action: handleSignOut, icon: <FaSignOutAlt /> },
        ]
      : [
          {
            title: "Dashboard",
            href:
              userRole === "Admin" ? "/admin/dashboard" : "/provider/dashboard",
            icon: <FaTachometerAlt />,
          },
          {
            title: "Profile",
            href: userRole === "Admin" ? "/admin/profile" : "/provider/profile",
            icon: <FaUser />,
          },
          { title: "Logout", action: handleSignOut, icon: <FaSignOutAlt /> },
        ];

  return (
    <div className="md:hidden">
      {/* Hamburger Menu Button */}
      <div className="flex items-center justify-between h-16">
        <button
          className="text-black hover:text-indigo-600 focus:outline-none ml-4"
          onClick={toggleNavbar}
        >
          <FiMenu
            className={`${isOpen ? "hidden" : "block"} h-7 w-7 text-[#4c40ed]`}
          />
          <FiX
            className={`${isOpen ? "block" : "hidden"} h-7 w-7 text-[#4c40ed]`}
          />
        </button>

        <div className={`flex items-center  ml-[13rem] mr-[2rem]`}>
                  <div
                    className="relative flex items-center p-3 bg-[#f8fcfd] rounded-full cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    {favouriteServices.length === 0 ? (
                      <FaRegHeart className="text-indigo-600 text-xl hover:scale-105 transition-transform" />
                    ) : (
                      <FaHeart className="text-indigo-600 text-xl hover:scale-105 transition-transform" />
                    )}
                    <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {favouriteServices.length}
                    </span>
                  </div>
                </div>
       
        {user && (
          <div className="flex items-center space-x-3 mr-4">
           
            <button
              onClick={toggleProfileMenu}
              ref={profileButtonRef}
              className="focus:outline-none cursor-pointer"
            >
              <div className="w-12 h-12 overflow-hidden rounded-full shadow-md">
                <Image
                  src={user?.profileImg[0]}
                  alt="User Image"
                  className="rounded-full"
                  height={48}
                  width={48}
                />
              </div>
            </button>
            {isProfileOpen && (
              <div
                ref={profileMenuRef}
                className="absolute top-14 right-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4"
              >
                {profileDropdownItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-200 last:border-0"
                  >
                    {item.href ? (
                      <Link href={item.href}>
                        <p
                          className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-[#f8fcfd]"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span className="mr-2">{item?.icon}</span>
                          {item.title}
                        </p>
                      </Link>
                    ) : (
                      <p
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-[#f8fcfd]"
                        onClick={item.action}
                      >
                        <span className="mr-2">{item?.icon}</span>
                        {item.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm font-medium hidden md:block">{`${user?.fName} ${user?.lName}`}</p>
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="px-4 pt-5 pb-3 space-y-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Menu</span>
            <button onClick={toggleNavbar}>
              <FiX className="h-6 w-6 text-black" />
            </button>
          </div>

          {navItems.map((item: any, index: number) => (
            <div key={index} className="border-b last:border-none">
              <div className="flex justify-between items-center">
                <Link
                  href={item.href}
                  className="hover:text-indigo-600  px-3 py-2 rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
                {item.subItems && item.subItems.length > 0 && (
                  <button
                    className="text-black hover:text-indigo-600 focus:outline-none"
                    onClick={() => toggleDropdown(index)}
                  >
                    <FiChevronDown
                      className={`h-5 w-5 ml-2 transform ${
                        dropdownOpen[index] ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                )}
              </div>
             
              {dropdownOpen[index] && (
                <div className="pl-4">
                  {item?.subItems?.map((subItem: any, subIndex: number) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="text-black hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

        
          {user ? (
            <></>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/choose-signup">
                <button className="flex items-center px-4 py-2 mt-4 text-indigo-600 bg-white rounded-md  text-md border border-indigo-600 hover:bg-indigo-600 hover:text-white">
                  <FiUserPlus className="mr-2" />
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="flex items-center px-4 py-2 mt-4 text-indigo-600 bg-white rounded-md  text-md border border-indigo-600 hover:bg-indigo-600 hover:text-white">
                  <FiLogIn className="mr-2" />
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleNavbar}
        ></div>
      )}
         {sidebarOpen && (
        <>
          <Cart services={favouriteServices} onClose={toggleSidebar} />
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
