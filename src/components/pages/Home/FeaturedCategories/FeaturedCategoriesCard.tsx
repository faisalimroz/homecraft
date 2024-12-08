'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiArrowRightCircle } from 'react-icons/fi';

interface Category {
    id: number;
    categoryName: string;
    categoryImg: string;
    categoryIcon: string;
    _count: {
        services: number;
    };
}

interface FeaturedCategoriesClientProps {
    categories: Category[];
}

const FeaturedCategoriesCard = ({ categories }:any) => {
    console.log(categories,'23')
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const totalPages = Math.ceil((categories?.length || 0) / itemsPerPage);

    const displayCategories = pathname === '/categories'
        ? categories?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : categories?.slice(-6);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page whenever items per page changes
    };

    return (
        <div className={`mx-auto px-6 md:px-[6rem] main ${pathname === '/categories' ? 'bg-white' : 'bg-[#f8fcfd] md:pt-72'} py-10 md:pb-14`}>
            {pathname !== '/categories' ? (
                <div className="section-heading mb-8">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-1/2" data-aos="fade-up">
                            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Featured Categories</h2>
                            <p className="text-gray-400 mt-4">What do you need to find?</p>
                        </div>
                        <div className="w-full md:w-1/2 text-right" data-aos="fade-up">
                            {displayCategories?.length > 3 && (
                                <Link href="/categories">
                                    <button className="text-indigo-600 border border-indigo-600  inline-flex items-center bg-white px-4 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition duration-300">
                                        View All
                                        <FiArrowRightCircle className="ml-2" size={20} />
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-end p-4">
                    <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-gray-700 flex items-center">Per Page:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="p-2 border rounded text-sm focus:outline-none focus:border-blue-600"
                    >
                        {[3, 6, 9, 12, 15, 18, 21].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className={`grid ${pathname === '/categories' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-2 md:gap-2 lg:gap-4`}>
                {displayCategories?.map((category:any) => (
                    <div key={category.id} className="relative rounded flex items-center justify-center overflow-hidden group bg-white p-2" data-aos="fade-up">
                        {pathname === '/categories' ? (
                            <Link href={`/services?categoryId=${category.id}`}>
                                <div className="relative rounded-lg overflow-hidden border h-[350px]">
                                    <div className="block image-wrapper">
                                        <img src={category.categoryImg} alt={category.categoryName} className="md:w-[350px] transition-transform duration-300 ease-in-out md:h-[250px]" />
                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <a href={`/service-details/${category.id}`} className="rounded transition flex flex-col items-center justify-center text-center">
                                                <div>
                                                    <span className="inline-block p-3 bg-gray-100 rounded-full mr-4">
                                                        <img src={category.categoryIcon} alt="icon" className="h-10 w-10" />
                                                    </span>
                                                </div>
                                            </a>
                                            <div>
                                                <h5 className="text-lg font-bold text-gray-800">{category.categoryName}</h5>
                                            </div>
                                        </div>
                                        <div className="text-gray-500">
                                            <p className="text-sm">{category._count.services} Services</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link href={`/services?categoryId=${category.id}`} className="feature-box p-4 rounded transition flex flex-col items-center justify-center text-center z-10">
                                <div className="mb-4">
                                    <span className="inline-block p-5 bg-gray-100 rounded-full">
                                        <img src={category.categoryIcon} alt="icon" className="bg-gray-100 h-12 w-12" />
                                    </span>
                                </div>
                                <h5 className="text-lg font-bold mb-4 text-black group-hover:text-white">{category.categoryName}</h5>
                            </Link>
                        )}
                        {pathname !== '/categories' && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                                <img src={category.categoryImg} alt={category.categoryName} className="w-full h-full object-cover transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {pathname === '/categories' && (
                <div className="flex justify-center mt-8">
                    <button
                        className={`inline-flex items-center px-4 py-2 mx-1 rounded-lg transition-colors ${
                            currentPage === 1 ? 'text-gray-500 cursor-not-allowed text-sm' : 'text-gray-700 hover:text-[#4f46e5] text-sm font-bold'
                        }`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FiArrowLeft className="mr-1" /> PREV
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 rounded-lg transition-colors ${
                                currentPage === index + 1
                                    ? 'bg-[#4f46e5] text-white'
                                    : 'bg-[#f8fcfd] border border-gray-300 text-gray-800 hover:bg-[#4f46e5] text-sm hover:text-white'
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`inline-flex items-center px-4 py-2 mx-1 rounded-lg transition-colors ${
                            currentPage === totalPages ? 'text-gray-500 cursor-not-allowed text-sm' : 'text-gray-700 text-sm font-bold hover:text-[#4f46e5]'
                        }`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        NEXT <FiArrowRight className="ml-1" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeaturedCategoriesCard;

