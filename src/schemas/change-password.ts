import * as yup from 'yup';

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .notOneOf([yup.ref('oldPassword')], 'New Password cannot be the same as the Old Password'), // Removed null
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword')], 'Confirm Password must match New Password'), // Removed null
});

export default changePasswordSchema;
