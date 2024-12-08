"use client";
import { useState } from 'react';
import { FiMenu, FiX, FiHelpCircle } from 'react-icons/fi';
import Link from 'next/link';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineLocalOffer, MdOutlineCategory } from 'react-icons/md';
import { BsSuitcaseLg } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { IoNewspaperOutline } from 'react-icons/io5';
import { CiBookmark, CiMoneyCheck1 } from "react-icons/ci";
import { PiUsers } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { GoStar } from "react-icons/go";

interface SidebarProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  data: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, data }) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const role = data?.data?.role.toLowerCase();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    onToggle(isOpen);
  };

  const getLinkClass = (link: string) => (
    `flex items-center px-4 py-3 mt-1 text-sm font-semibold rounded-lg transition-all hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 ${
      activeLink === link ? 'bg-gradient-to-r from-gray-100 to-gray-200' : 'text-gray-900'
    }`
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-20 mt-3 shadow-lg transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0 bg-white h-full' : '-translate-x-full'
      } md:relative md:translate-x-0 rounded-lg md:rounded-none`}
    >
      <div className="p-4 h-full">
        {/* Sidebar Toggle Button */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-800 hover:text-gray-900"
          onClick={() => onToggle(!isOpen)}
        >
          {isOpen ? (
            <FiX className="w-7 h-7" />
          ) : (
            <FiMenu className="w-7 h-7" />
          )}
        </button>

        {/* Sidebar Header with "Home Crafter" Text */}
        {isOpen && (
          <div className="pl-6 md:hidden">
           
            <h1 className="text-2xl font-bold text-indigo-600">
              Home <span className="text-gray-900">Crafter</span>
            </h1>
          </div>
        )}

        {/* Sidebar Menu Items */}
        <div className={`mt-2 md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block overflow-y-auto h-[calc(100vh-3rem)] w-[250px]`}>
          <Link href={`/${role}/dashboard`}>
            <p onClick={() => handleLinkClick('dashboard')} className={getLinkClass('dashboard')}>
              <MdOutlineDashboard className="w-5 h-5 mr-2 text-gray-800" />
              <span>Dashboard</span>
            </p>
          </Link>
          <Link href={`/${role}/services`}>
            <p onClick={() => handleLinkClick('provider-services')} className={getLinkClass('provider-services')}>
              <BsSuitcaseLg className="w-5 h-5 mr-2 text-gray-800" />
              <span>My Services</span>
            </p>
          </Link>
          {role === 'admin' && (
            <Link href={`/${role}/user`}>
              <p onClick={() => handleLinkClick('provider-user')} className={getLinkClass('provider-user')}>
                <PiUsers className="w-5 h-5 mr-2 text-gray-800" />
                <span>User</span>
              </p>
            </Link>
          )}
          {role === 'admin' && (
            <Link href={`/${role}/provider`}>
              <p onClick={() => handleLinkClick('provider')} className={getLinkClass('provider')}>
                <GrUserWorker className="w-5 h-5 mr-2 text-gray-800" />
                <span>Provider</span>
              </p>
            </Link>
          )}
          <Link href={`/${role}/bookings`}>
            <p onClick={() => handleLinkClick('provider-bookings')} className={getLinkClass('provider-bookings')}>
              <FaRegCalendarAlt className="w-5 h-5 mr-2 text-gray-800" />
              <span>Bookings</span>
            </p>
          </Link>
          <Link href={`/${role}/payout`}>
            <p onClick={() => handleLinkClick('provider-payout')} className={getLinkClass('provider-payout')}>
              <CiMoneyCheck1 className="w-5 h-5 mr-2 text-gray-800" />
              <span>Payout</span>
            </p>
          </Link>
          <Link href={`/${role}/offered-service`}>
            <p onClick={() => handleLinkClick('offered-service')} className={getLinkClass('offered-service')}>
              <CiBookmark className="w-5 h-5 mr-2 text-gray-800" />
              <span>Offered Service</span>
            </p>
          </Link>
          <Link href={`/${role}/combo-pack`}>
            <p onClick={() => handleLinkClick('combo-pack')} className={getLinkClass('combo-pack')}>
              <MdOutlineCategory className="w-5 h-5 mr-2 text-gray-800" />
              <span>Combo Pack</span>
            </p>
          </Link>
          <Link href={`/${role}/availability`}>
            <p onClick={() => handleLinkClick('availability')} className={getLinkClass('availability')}>
              <FaRegClock className="w-5 h-5 mr-2 text-gray-800" />
              <span>Availability</span>
            </p>
          </Link>
          <Link href={`/${role}/offer`}>
            <p onClick={() => handleLinkClick('provider-offer')} className={getLinkClass('provider-offer')}>
              <MdOutlineLocalOffer className="w-5 h-5 mr-2 text-gray-800" />
              <span>Offer</span>
            </p>
          </Link>
          {role === 'admin' && (
            <Link href={`/${role}/reviews`}>
              <p onClick={() => handleLinkClick('reviews')} className={getLinkClass('reviews')}>
                <GoStar className="w-5 h-5 mr-2 text-gray-800" />
                <span>Reviews</span>
              </p>
            </Link>
          )}
          {role === 'admin' && (
            <Link href={`/${role}/category`}>
              <p onClick={() => handleLinkClick('provider-category')} className={getLinkClass('provider-category')}>
                <AiOutlineProduct className="w-5 h-5 mr-2 text-gray-800" />
                <span>Category</span>
              </p>
            </Link>
          )}
          <Link href={`/${role}/blog`}>
            <p onClick={() => handleLinkClick('provider-blog')} className={getLinkClass('provider-blog')}>
              <IoNewspaperOutline className="w-5 h-5 mr-2 text-gray-800" />
              <span>Blog</span>
            </p>
          </Link>
          <Link href={`/${role}/faq`}>
            <p onClick={() => handleLinkClick('provider-faq')} className={getLinkClass('provider-faq')}>
              <FiHelpCircle className="w-5 h-5 mr-2 text-gray-800" />
              <span>FAQ</span>
            </p>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
