"use client";
import React, { useState } from 'react';
import { useCommentByBlogIdQuery } from '@/redux/api/commentApi';
import { FaReply } from 'react-icons/fa';

interface ServiceCardProps {
  blogId: string;
}

const CommentCard: React.FC<ServiceCardProps> = ({ blogId }) => {
  const { data, isLoading, error } = useCommentByBlogIdQuery(blogId);
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments</div>;
  }

  if (!data || data?.data?.length === 0) {
    return (
      <div className="mt-8 text-center">
        <h4 className="text-lg font-semibold mb-2">Comments</h4>
        <p className="text-gray-600">
          No comments available for this blog yet. Be the first to leave a comment!
        </p>
      </div>
    );
  }

  
  const commentsToShow = showAll ? data.data : data.data.slice(0, 3);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">Comments</h4>
      <ul className="space-y-4">
        {commentsToShow.map((comment:any) => (
          <li key={comment.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <img
                  src={comment.user.profileImg[0] || "https://via.placeholder.com/150"}
                  className="w-12 h-12 rounded-full"
                  alt="User Avatar"
                />
                <div className="ml-4">
                  <h6 className="font-semibold">{comment.user.fName} {comment.user.lName}</h6>
                  <p className="text-sm text-gray-500">
                  {new Date(comment?.createdAt).toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})}
                  </p>
                </div>
                {/* <a href="#" className="ml-auto text-blue-500">
                  <FaReply className="inline-block mr-2" />
                  Reply
                </a> */}
              </div>
              <p className="text-gray-700 mb-4">{comment.comment}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* Button to toggle showing all comments */}
      {data.data.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-blue-500"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
