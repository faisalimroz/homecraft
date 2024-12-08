import * as yup from "yup";

const reviewSchema = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required"),
  
});

export default reviewSchema;
