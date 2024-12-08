import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Form from '../Forms/Form';
import toast, { Toaster } from 'react-hot-toast';
import { TiTickOutline } from 'react-icons/ti';
import FormTextArea from '../Forms/FormTextArea';
import { useAddReviewMutation } from '@/redux/api/reviewApi';
import Spinner from './Spinner';
import { useAddCommentMutation } from '@/redux/api/commentApi';
import { ShowToast } from './ShowToast';
import reviewSchema from '@/schemas/review';
import { yupResolver } from '@hookform/resolvers/yup';

interface BlogProps {
  blogId: string; 
}

const Comment: React.FC<BlogProps> = ({ blogId }) => {
  const [addComment] = useAddCommentMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: { comment: string }) => {
    const commentData = { comment: values.comment, blogId }; // Include blogId in the payload
    const toastId = toast.loading('Posting...')
    try {
      setLoading(true);
      const res: any = await addComment(commentData).unwrap();
      if (res && res.data) {
        setLoading(false);
       ShowToast({
        message: "Comment submitted successfully"
       })
      }
    } catch (err: any) {
      console.error(err);
      setLoading(false); // Ensure loading state is reset on error
      toast.error("Failed to submit review", {
        style: {
          borderRadius: "10px",
          background: "#e74c3c",
          color: "#fff",
        },
        duration: 2000,
      });
    }finally{
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-8">
        <h5 className="text-xl font-semibold mb-4">Write a Comment</h5>

        <Form submitHandler={onSubmit} resolver={yupResolver(reviewSchema)}>
          <FormTextArea name="comment" rows={5} placeholder="Add a comment" />
          <button
  type="submit"
  className={`text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white inline-flex items-center justify-center px-4 py-2 rounded-md text-md border border-[#4f46e5] 
    ${loading ? 'w-[150px] bg-indigo-600 opacity-50 cursor-not-allowed' : 'bg-white w-[150px]hover:bg-indigo-600 hover:text-white'}`
  }
  disabled={loading}
>
  {loading ? <Spinner /> : 'Post Comment'}
</button>

        </Form>
      </div>
    </div>
  );
};

export default Comment;
