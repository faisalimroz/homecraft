import * as yup from 'yup';

const signupSchema = yup.object().shape({
  fName: yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  
  lName: yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  
  email: yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  
  contactNo: yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
  
  password: yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export default signupSchema;
