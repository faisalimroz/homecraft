
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useLoggedUserQuery } from "@/redux/api/userApi";

type CategoryFieldProps = {
  name: string;
  label?: string;
};

const CategoryField = ({ name, label }: CategoryFieldProps) => {
  const { data }:any = useCategoriesQuery({
    limit: 100,
    page: 1,
  });
  // console.log(data);
  const Categories = data?.data;
  const CategoryOptions = Categories?.map((category: any) => {
    
    return {
      label: category?.categoryName,
      value: category?.id,
    };
  });

  return (
    <>
    <FormSelectField
      name={name}
      label={label}
      options={CategoryOptions as SelectOptions[]}
    />
   
  </>
  );
};

export default CategoryField;
