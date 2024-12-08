import { useLatestBlogsQuery } from '@/redux/api/blogApi';
import Link from 'next/link';
import React, { useState } from 'react';

interface LatestBlogsProps {
  blogId: string;
}

const LatestNews: React.FC<LatestBlogsProps> = ({ blogId }) => {
  const { data } = useLatestBlogsQuery(blogId);
  const blogs = data?.data;
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const blogsToShow = showAll ? blogs : blogs?.slice(0, 3);

  return (
    <div className="p-4 rounded-lg shadow-sm mb-6 bg-[#f8fcfd]">
      <h4 className="text-lg font-semibold mb-4">Latest News</h4>
      <ul className="space-y-4">
        {blogsToShow?.map((blog: any, index: number) => (
          <li
            key={blog?.id}
            className={`flex items-start pb-4 ${index !== blogsToShow.length - 1 ? 'border-b border-gray-300' : ''}`}
          >
            <img
              className="w-24 h-24 rounded-lg mr-4"
              src={blog?.blogImg[0]}
              alt={blog?.title}
            />
            <div>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h4 className="text-sm font-semibold">
                <Link href={`/blog-details/${blog?.id}`} className="hover:underline">
                  {blog?.title}
                </Link>
              </h4>
            </div>
          </li>
        ))}
      </ul>

      {blogs?.length > 3 && (
        <button
          onClick={toggleShowAll}
          className="text-blue-500 hover:underline mt-4"
        >
          {showAll ? 'See Less' : 'See More'}
        </button>
      )}
    </div>
  );
};

export default LatestNews;
