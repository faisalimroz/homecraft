import * as yup from "yup";

const offerSchema = yup.object().shape({
 offerName: yup
    .string()
    .required("Offer Name is required")
    .min(3, "Offer Name must be at least 3 characters long")
    .max(50, "Offer Name must be at most 50 characters long"),
  startDate: yup
    .date()
    .required("Start Date is required"),
  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref('startDate'), "End Date must be later than Start Date"),


});

export default offerSchema;
