import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { TiTickOutline } from 'react-icons/ti';
import { useAddReviewMutation } from '@/redux/api/reviewApi';
import Form from '@/components/Forms/Form';
import FormTextArea from '@/components/Forms/FormTextArea';
import Spinner from '@/components/UI/Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import reviewSchema from '@/schemas/review';


interface Review {
  rating: number;
  comment: string;
}
interface ServiceCardProps {
    serviceId: string; //
    role:string; 
  }
  

const Review: React.FC<ServiceCardProps> = ({serviceId,role}) => {
  // console.log(role,'21')
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [addReview] = useAddReviewMutation();
  const [loading, setLoading] = useState<boolean>(false);  
  const [ratingError, setRatingError] = useState<string | null>(null);

  const onSubmit = async (values: any) => {
    if (role === 'Provider' || role === 'Admin') {
      toast.error('Review feature is only available for Users.', {
        duration: 2000,
      });
      setRating(0);
      return; 
    }
    if (rating === 0) {
      setRatingError("Please select a rating.");
      return;
    }
   
      const reviewData = { rating, comment: values.comment,serviceId };
      const toastId = toast.loading('Posting')
      try {
        setLoading(true);  
        const res: any = await addReview(reviewData).unwrap();
        if (res && res.data) {
            setLoading(false);
          toast("Review submitted successfully", {
            icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline/></span>,
            style: {
              borderRadius: "10px",
              background: "#4f46e5",
              color: "#fff",
            },
            duration: 2000, 
          });
          setReviews([...reviews, reviewData]);
          setRating(0);
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err?.data, {
         duration: 2000,
        });
      }finally{
        toast.dismiss(toastId)
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
     <div className="mt-8">
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
  className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-md border ${
    loading
      ? 'w-[150px] bg-indigo-700 text-white opacity-50 cursor-not-allowed px-4 py-2' 
      : 'text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white border-indigo-700 px-4 py-2' 
  }`}
  disabled={loading}
>
  {loading ? <Spinner /> : 'Submit Review'}
</button>

      </Form>
    </div>
   </div>
  );
};

export default Review;