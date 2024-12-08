"use client";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

const HeroSearchInput = () => {
  return (
    <>
      <Link href="/services">
   
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
          <FaSearch className="inline mr-2" />
          Search
        </button>
      </Link>
    </>
  );
};

export default HeroSearchInput;
