import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("password is required"),

});

export default loginSchema;