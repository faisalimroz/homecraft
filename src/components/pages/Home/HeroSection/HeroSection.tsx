import React from 'react';
import { FaSearch } from "react-icons/fa"; 
import Image from 'next/image';
import suitcase from "../../../../../public/assets/suitcase.svg";
import HeroSearchInput from './HeroSearchInput';

const HeroSection = () => {
    return (
        <div className="mx-auto px-6 pb-8 md:pb-0 md:px-[4rem] hero-bg pt-14 main ">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center w-full">
                    <div className="lg:w-6/12 w-full">
                        <div className="section-search" data-aos="fade-up">
                            <p className="text-lg text-gray-200">Search From 150 Awesome Verified Ads!</p>
                            <h1 className="text-4xl md:text-6xl font-bold mt-2 text-white leading-tight">
                                Best Solution for Every 
                            </h1>
                            <h1 className="text-4xl md:text-6xl font-bold mt-2 text-indigo-600">House Problems</h1>
                            <div className="bg-white p-2 rounded-lg shadow-xl flex items-center my-8">
                            <input 
                                type="text" 
                                placeholder="What service do you need?" 
                                className="flex-grow p-3 outline-none text-gray-700"
                            />
                        <HeroSearchInput/>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl">
                            <h6 className="text-xl text-white mb-4">Trusted by 2M+ Professionals</h6>
                            <div className="flex items-center">
                                <div className="flex -space-x-2 mr-4">
                                    {['avatar-06', 'avatar-07', 'avatar-08', 'avatar-09', 'avatar-10'].map((avatar, index) => (
                                        <img key={index} src={`assets/${avatar}.jpg`} alt="User" className="w-10 h-10 rounded-full border-2 border-white"/>
                                    ))}
                                </div>
                                <span className="text-gray-300">Join our growing community!</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="lg:w-6/12 w-full mt-8 lg:mt-0">
                        <div className="relative flex justify-center">
                            <div className=''>
                            <img src="assets/provider-7.png" alt="image" className="w-72 md:w-96"/>

                            </div>
                            <div className="absolute bottom-4 left-4 lg:left-auto lg:right-4 bg-white p-6 rounded-lg shadow-xl">
                                <div className="flex items-center space-x-2">
                                    <h5 className="text-2xl font-bold text-indigo-700">+21 k</h5>
                                </div>
                                <div className='flex mt-2'>
                                    <p className="text-md text-gray-700">Services Completed</p>
                                    <div className='bg-indigo-600 p-2 ml-4 rounded-full'>
                                        <Image src={suitcase} alt='suitcase' className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
             
         
            </div>
        </div>
    );
};

export default HeroSection;
