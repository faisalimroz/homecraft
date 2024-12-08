import Main from "@/components/pages/BlogDetails/main";
import BreadcrumbBar from "@/components/UI/BreadcrumbBar";
import { Metadata } from "next";


type IDProps = {
  params: any;
};

export const metadata: Metadata = {
  title: "HC | Blog Details",
};
const BlogDetails = ({ params }: IDProps) => {
  const { id } = params;

  return (
    <div  className='main'>
      <BreadcrumbBar header="Blog Details" name="Blog Details"  />
      <Main id={id}/>
    </div>
  );
};

export default BlogDetails;
