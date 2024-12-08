import * as yup from 'yup';


const agricultureLoanSchema = yup.object().shape({
  loanName: yup.string().required('Loan name is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be a positive number'),
  cropType: yup.string().required('Crop type is required'),
  landSize: yup.number().required('Land size is required').positive('Land size must be a positive number'),
  guarantorName: yup.string().required('Guarantor name is required'),
  guarantorAddress: yup.string().required('Guarantor address is required'),
  guarantorPhone: yup.string().required('Guarantor phone is required'),
});

export default agricultureLoanSchema;
