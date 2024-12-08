"use client"
import { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';
import Pagination from '@/components/UI/Pagination'; // 
import ItemsPerPageSelector from '@/components/UI/ItemsPerPageSelector'; 
import ConfirmModal from '@/components/UI/ConfirmModal';
import { useDeleteReviewMutation, useReviewsQuery } from '@/redux/api/reviewApi';
import Loader from '@/components/UI/Loader';

const ReviewsListing = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const{data,isLoading} = useReviewsQuery(undefined);
  const [deleteReview] = useDeleteReviewMutation();

  const reviews:any = data?.data;
   

    const totalPages = Math.ceil((reviews?.length || 0) / itemsPerPage);
    const paginatedReviews = reviews?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleDeleteClick = (review: any) => {
        setReviewToDelete(review);
        setShowConfirmModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowConfirmModal(false);
        setReviewToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        if (reviewToDelete) {
           const res =  await deleteReview(reviewToDelete?.id);
            setShowConfirmModal(false);
            setReviewToDelete(null);
        }
    };
    if(isLoading){
        return <Loader/>
    }

  return (
    <div className="px-6 py-7">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#2a2a3d]">Reviews Listing</h2>
      </div>
      <ul className="space-y-6">
        {paginatedReviews?.map((review: any) => (
            <li key={review?.id} className="border p-4 rounded-lg">
              <div className="review-profile flex items-start mb-4">
                <div className="review-img flex-shrink-0">
                  <img
                    src={review?.user?.profileImg[0]}
                    className="img-fluid rounded-full w-12 h-12"
                    alt="review Avatar"
                  />
                </div>
                <div className="review-name ml-4">
                  <h6 className="text-lg font-semibold">
                    {review?.user?.fName} {review?.user?.lName}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {new Date(review?.createdAt).toLocaleString('en-US', {
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
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDeleteClick(review)}
                    className="text-red-500 hover:text-red-700 ml-4"
                    aria-label="Delete review"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="mb-4 text-gray-700">{review.comment}</p>
         
            </li>
          ))}
      </ul>
      { reviews?.length > 0 &&      <div className="flex items-center justify-end mt-10">
                        <ItemsPerPageSelector
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div> }


      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the review?`}
      />
    </div>
  );
};

export default ReviewsListing;
