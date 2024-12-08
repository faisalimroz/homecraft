"use client";
import React, { useState } from 'react';
import { useReviewByServiceIdQuery } from '@/redux/api/reviewApi';
import { FaStar, FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';
import Rating from '@/components/UI/Rating';

interface Review {
  id: string;
  userId: string;
  serviceId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    fName: string;
    lName: string;
    email: string;
    profileImg: string[];
  };
}

interface ServiceCardProps {
  serviceId: string;
}

const ReviewCard: React.FC<ServiceCardProps> = ({ serviceId }) => {
  const { data } = useReviewByServiceIdQuery(serviceId);
  const [showAll, setShowAll] = useState(false);

  if (!data || data?.data?.length === 0) {
    return (
      <div className="mt-8 text-center">
        <h5 className="text-2xl font-semibold mb-4">Reviews</h5>
        <p className="text-gray-600">No reviews available for this service yet. Be the first to leave a review!</p>
      </div>
    );
  }

  const reviewsToShow = showAll ? data.data : data.data.slice(0, 3);

  return (
    <div className="mt-8">
      <h5 className="text-2xl font-semibold mb-4">Reviews</h5>
      <ul className="space-y-6">
        {reviewsToShow.map((review: Review) => (
          <li key={review.id} className="border p-4 rounded-lg shadow-sm">
            <div className="review-profile flex items-start mb-4">
              <div className="review-img flex-shrink-0">
                <img src={review.user.profileImg[0]} className="img-fluid rounded-full w-12 h-12" alt="User Avatar" />
              </div>
              <div className="review-name ml-4">
                <h6 className="text-lg font-semibold">{review.user.fName} {review.user.lName}</h6>
                <p className="text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleString('en-US', {
                  
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="ml-auto flex items-center mt-3">
                <div className="rating flex">
            
                  <Rating rating={review.rating}/>
                </div>
              </div>
            </div>
            <p className="mb-4 text-gray-700">{review.comment}</p>
            <div className="flex justify-end items-center">
             
              {/* <div className="recommend-info flex items-center space-x-2">
                <p className="text-gray-700">Recommend?</p>
                <a href="#" className="flex items-center space-x-1 text-green-600">
                  <FaThumbsUp />
                  <span>Yes</span>
                </a>
                <a href="#" className="flex items-center space-x-1 text-red-600">
                  <FaThumbsDown />
                  <span>No</span>
                </a>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-white bg-[#4f46e5] inline-flex items-center justify-center px-4 py-2 rounded-md text-sm border border-[#4f46e5]"
        >
          {showAll ? 'Show Less' : 'View All Reviews'}
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
