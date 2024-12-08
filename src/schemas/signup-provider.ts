import * as yup from 'yup';

const signupForProviderSchema = yup.object().shape({
  // First Name Validation
  fName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),

  // Last Name Validation
  lName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),

  // Email Validation
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

 
  contactNo: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),

 
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),


  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Select a valid gender")
    .required("Gender is required"),

 
  dob: yup
    .date()
    .typeError("Invalid date format")
    .required("Date of birth is required"),


  categoryId: yup
    .string()
    .required("Category selection is required"),

 
  bio: yup
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(500, "Bio cannot exceed 500 characters")
    .required("Bio is required"),

  
  address: yup
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(200, "Address cannot exceed 200 characters")
    .required("Address is required"),
});

export default signupForProviderSchema;
