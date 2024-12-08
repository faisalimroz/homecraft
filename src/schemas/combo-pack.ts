import * as yup from "yup";

const comboSchema = yup.object().shape({
    comboName: yup
    .string()
    .required("Combo Name is required"),
  
  
});

export default comboSchema;
