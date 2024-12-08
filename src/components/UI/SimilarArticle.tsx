import { useSimilarBlogsQuery } from '@/redux/api/blogApi';
import Link from 'next/link';
import React, { useState } from 'react';


interface Blog {
  id: string;
  title: string;
  blogImg: string[];
  createdAt: string;
}


interface SimilarArticleProps {
  categoryId: string; 
  blogId: string;     
}

const SimilarArticle: React.FC<SimilarArticleProps> = ({ categoryId, blogId }) => {
  
  const { data } = useSimilarBlogsQuery({ categoryId, blogId });
  const [showAll, setShowAll] = useState<boolean>(false); 

  const toggleShowAll = () => setShowAll(!showAll);



  const blogs: Blog[] = data?.data || [];

  const blogsToShow = showAll ? blogs : blogs.slice(0, 3);

  return (
    <div className="p-4 rounded-lg shadow-sm mb-6 bg-[#f8fcfd]">
      <h4 className="text-lg font-semibold mb-4">Similar Articles</h4>
      <ul className="space-y-4">
        {blogsToShow.map((blog) => (
          <li key={blog.id} className="flex items-start">
            <img
              className="w-24 h-24 rounded-lg mr-4"
              src={blog.blogImg[0]} 
              alt={blog.title}
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

      {blogs.length > 3 && (
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

export default SimilarArticle;
