"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const Partners = () => {
  const partners = [
    "assets/partner1.svg",
    "assets/partner2.svg",
    "assets/partner3.svg",
    "assets/partner4.svg",
    "assets/partner5.svg",
    "assets/partner6.svg",
  ];

  return (
    <div className="mx-auto px-6 md:px-[6rem] py-14 main">
      <div className="text-center mb-16" >
        <h2 className="text-4xl font-bold text-gray-800">Our Partners</h2>
        <p className="text-lg text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur elit</p>
      </div>
      <div className="">
        <Marquee
          gradient={false}
          speed={30}
          pauseOnHover={true}
          className="flex space-x-8"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="mx-3 border px-2"
            >
              <img
                src={partner}
                alt={`Partner ${index + 1}`}
                className="h-[60px] w-[200px] mx-auto  drop-shadow-lg "
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Partners;
