import Link from 'next/link';
import React from 'react';

const BlogCard = ({blog}:any) => {
  const {id,title,blogImg,category,user,createdAt} = blog;
    return (
        <div>
             <div
            key={blog?.id}
            className=" p-6 bg-white border rounded-lg h-[420px]"
            // data-aos="fade-up"
          >
            <div className="image-wrapper">
              <img className="w-full h-48 object-cover  transition-transform duration-300 ease-in-out" alt={title} src={blogImg[0]} />
            </div>
            <div className="p-4">
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
              <h3 className="title text-lg font-semibold mb-2">
                <a href="blog-details.html" className="text-gray-800 hover:text-gray-600">
                  {title}
                </a>
              </h3>
              <div className="usefull-bottom flex items-center justify-between mt-5">
                <div className="useful-img flex items-center">
                  <img
                    src={user?.profileImg[0]}
                    alt={user?.fName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user?.fName} {user?.lName}</span>
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