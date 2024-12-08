import React from "react";
import Image from "next/image";
import BreadcrumbBar from "@/components/UI/BreadcrumbBar";
import AboutImage from "../../../../public/assets/home-service-business-ideas.webp";
import HowItWorks from "../Home/HowItWorks/HowItWorks";
import TopProviders from "../Home/TopProviders/TopProviders";
import Testimonial from "../Home/Testimonial/Testimonial";
const About = () => {
  return (
    <>
      <BreadcrumbBar header="About" name="About" />
      <div className="main">
      <div className=" px-6 md:px-[6rem] py-16">
      <div className="w-full flex flex-wrap  justify-between">
        
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <Image
              src={AboutImage}
              alt="Company Image"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <div className="w-full md:w-1/2 pl-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to redefine service excellence by offering
              innovative and tailored solutions that exceed expectations. We
              envision a future where our services empower individuals and
              businesses to achieve their full potential with ease and
              confidence.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Delivering quality and reliability in every service.</li>
              <li>Building lasting relationships with our clients.</li>
              <li>Continuously innovating to meet changing demands.</li>
            </ul>
          </div>
        </div>
      </div>

        <HowItWorks />
        <TopProviders />
        <div className="pb-10"> <Testimonial /></div>
       
      </div>
    </>
  );
};

export default About;
