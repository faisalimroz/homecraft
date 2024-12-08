import Link from 'next/link';
import React from 'react';

const BlogCard = ({blog,isLoading}:any) => {
  const {id,title,blogImg,category,provider,createdAt} = blog;
    return (
        <div className=''>
             <div
            key={blog?.id}
            className=" py-6 px-4 h-[400px] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ml-1 md:ml-4 mr-1 mb-1 md:mb-4"
           
          >
            <div className="image-wrapper">
              <img className="w-full h-48 object-cover rounded-md transition-transform duration-300 ease-in-out" alt={title} src={blogImg[0]} />
            </div>
            <div className="py-4">
              <div className="service-bottom-seven flex items-center justify-between mb-2">
                <div className="service-bottom-icons flex items-center text-gray-500 text-sm">
                  <i className="feather-calendar mr-1"></i>
                  <span>  {new Date(blog.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</span>
                </div>
                <h6 className="text-gray-500">{category?.categoryName}</h6>
              </div>
              <h3 className="title text-lg font-semibold mb-4">
                <Link href={`/blog-details/${id}`} className="text-gray-800 hover:text-indigo-600">
                  {title}
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-5">
                <div className=" flex items-center">
                  <img
                    src={provider?.profileImg[0]}
                    alt={provider?.fName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{provider?.fName} {provider?.lName}</span>
                </div>
                <Link href={`/blog-details/${id}`} className="text-blue-500 hover:text-blue-400">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
};

export default BlogCard;