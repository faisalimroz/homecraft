"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {  useDeleteBlogMutation, useProviderBlogsQuery } from '@/redux/api/blogApi';
import Loader from '@/components/UI/Loader';
import ConfirmModal from '@/components/UI/ConfirmModal';
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector';
import Pagination from '@/components/UI/Pagination';

// Define the types for Blog
interface Blog {
  id: string;
  title: string;
  content: string;
  blogImg: string[];
  category: {
    categoryName: string;
  };
  provider: {
    fName: string;
    lName: string;
    profileImg: string[];
  };
  createdAt: string;
}

const ProviderBlog = () => {
  const { data, isLoading } = useProviderBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const blogs = data?.data || [];

  const totalPages = Math.ceil((blogs?.length || 0) / itemsPerPage);
  const paginatedBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Function to open the delete confirmation modal
  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  // Function to confirm deletion
  const handleConfirmDelete = async () => {
    if (selectedBlog) {
      try {
        await deleteBlog(selectedBlog.id).unwrap();
        setIsDeleteModalOpen(false);
        setSelectedBlog(null);
      } catch (error) {
        console.error("Failed to delete blog", error);
      }
    }
  };

  // Function to close the delete confirmation modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-6 py-7">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#2a2a3d]">Blog Listing</h2>
        <div>
          <Link href="/provider/blog/create-blog">
            <button className="text-[#4f46e5] hover:bg-[#4f46e5] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#4f46e5]">
              Add Blog
            </button>
          </Link>
        </div>
      </div>

      {paginatedBlogs?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog: Blog) => (
              <div key={blog.id} className="border p-4 bg-white rounded-lg relative">
                <a href={`blog-details/${blog.id}`}>
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    alt="Blog Image"
                    src={blog.blogImg[0]} // Displaying the first image in the array
                  />
                </a>
                <div className="p-4">
                  <div className="service-bottom-seven flex items-center justify-between mb-2">
                    <div className="service-bottom-icons flex items-center text-gray-500 text-sm">
                      <i className="feather-calendar mr-1"></i>
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>
                    <h6 className="text-gray-500">{blog.category.categoryName}</h6>
                  </div>
                  <h3 className="title text-lg font-semibold mb-2">
                    <a href={`blog-details/${blog.id}`} className="text-gray-800 hover:text-gray-600">
                      {blog.title}
                    </a>
                  </h3>
                  <div className="flex justify-between mt-5">
                    <div className="flex items-center">
                      <img
                        src={blog.provider.profileImg[0]}
                        alt="provider"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="mr-4">{blog.provider.fName} {blog.provider.lName}</span>
                    </div>
                    <div>
                      <Link href={`/provider/blog/edit/${blog?.id}`}>
                        <button className="bg-white p-1 rounded-full hover:bg-gray-200" aria-label="Edit Blog">
                          <FiEdit size={18} className="text-blue-500" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(blog)}
                        className="bg-white p-1 rounded-full hover:bg-gray-200 ml-2"
                        aria-label="Delete Blog"
                      >
                        <FiTrash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination and Items Per Page Selector */}
          <div className="flex items-center justify-end mt-10">
            <ItemsPerPageSelector
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-6">No blogs available.</div>
      )}

      {selectedBlog && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete the blog "${selectedBlog.title}"?`}
        />
      )}
    </div>
  );
};

export default ProviderBlog;
