import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useAddProviderReviewMutation } from '@/redux/api/reviewApi';
import Form from '@/components/Forms/Form';
import FormTextArea from '@/components/Forms/FormTextArea';
import Spinner from '@/components/UI/Spinner';
import { ShowToast } from '@/components/UI/ShowToast';
import { yupResolver } from '@hookform/resolvers/yup';
import reviewSchema from '@/schemas/review';

interface Review {
  rating: number;
  comment: string;
}

interface ServiceCardProps {
  providerId: string;
}

const ProviderReview: React.FC<ServiceCardProps> = ({ providerId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [addProviderReview] = useAddProviderReviewMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [ratingError, setRatingError] = useState<string | null>(null);


  const onSubmit = async (values: any) => {
   
    if (rating === 0) {
      setRatingError("Please select a rating.");
      return;
    }
    const reviewData = { rating, comment: values.comment, providerId };
    const toastId = toast.loading("Posting...");

    try {
      setLoading(true);
      const res: any = await addProviderReview(reviewData).unwrap();
      if (res && res.data) {
        ShowToast({ message: res?.message });
        setReviews([...reviews, reviewData]);
        setRating(0); 
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data, {
        style: {
          borderRadius: "10px",
          background: "#e74c3c",
          color: "#fff",
        },
        duration: 2000,
      });
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  
  useEffect(() => {
    if (rating > 0) {
      setRatingError(null); 
    }
  }, [rating]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h5 className="text-2xl font-semibold mb-4">Reviews</h5>

      <Form submitHandler={onSubmit} resolver={yupResolver(reviewSchema)}>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer"
                  color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        {ratingError && <p className="text-red-500 my-2">{ratingError}</p>}
        <FormTextArea name="comment" rows={5} placeholder="Add a comment" />

        <button
          type="submit"
          className={`text-white bg-[#4f46e5] inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#4f46e5] ${
            loading ? 'w-[150px] opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Submit Review'}
        </button>
      </Form>
    </div>
  );
};

export default ProviderReview;
