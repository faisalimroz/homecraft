import React from "react";
import Gallery from "../Gallery/Gallery";
import VideoComponent from "../VideoComponent/VideoComponent";
import ReviewCard from "../ReviewCard/ReviewCard";
import RelatedServices from "../RelatedServices/RelatedServices";
import ServiceCard from "../ServiceCard/ServiceCard";
import Review from "../Review/Review";
import ProviderInfo from "../ProviderInfo/ProviderInfo";
import { useLoggedUserQuery } from "@/redux/api/userApi";


// Define the types for the service data
interface ServiceData {
  id: string;
  serviceName: string;
  description: string;
  regularPrice: number;
  location: string;
  duration: string;
  videoUrl: string;
  serviceImg: string[];
  keyFeature1:string;
  keyFeature2:string;
  keyFeature3:string;
  keyFeature4:string;
  
  provider: {
    fName: string;
    lName: string;
    email: string;
    contactNo: string;
    address: string;
    profileImg: string[];
    averageRating:number;
    totalReviews:number;
    createdAt:string;

  };
  categoryId: string;
}

interface ProviderInfoProps {
  data: {
    data: ServiceData;
  };
}

const ServiceInfo: React.FC<ProviderInfoProps> = ({ data }) => {
  const { data:userData } = useLoggedUserQuery(undefined);
  const user = userData?.data;
  const role = user?.role;
  const service = data?.data;
  const images = service?.serviceImg || [];
  const videoUrl = service?.videoUrl;
  const serviceId = service?.id;
  const categoryId = service?.categoryId;

  return (
    <div>
      <div className="mx-auto px-6 md:px-[6rem] ">
        <div className="flex flex-wrap lg:flex-nowrap mb-[8rem]">
          <div className="lg:w-2/3 w-full mb-8 lg:mb-0 md:h-[1810px] overflow-y-auto scrollbar-hide ">
            <div>
              <h5 className="text-2xl font-semibold mb-4">Service Details</h5>
              <p className="text-gray-700">{service?.description}</p>
            </div>
          
            <ProviderInfo provider={service?.provider} />
            <Gallery images={images} />
            <VideoComponent videoUrl={videoUrl || ''} />
            <Review serviceId={serviceId} role={role}/>
            <ReviewCard serviceId={serviceId} />
            <RelatedServices categoryId={categoryId} serviceId={serviceId} />
          </div>

          <div className="lg:w-1/3 w-full lg:pl-8 right md:h-[1700px]">
            <ServiceCard service={service} role={role}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
