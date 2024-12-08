"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useFaqsQuery } from '@/redux/api/faqApi';
import BreadcrumbBar from '@/components/UI/BreadcrumbBar';


const Faq = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { data } = useFaqsQuery(undefined);

  const faqs = data?.data || [];

  const togglePanel = (panelId: string) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId));
  };

  

  const getItems = () => {
    if (!faqs) return [];

    return faqs.map((faq: any) => (
      <div
        key={faq.id}
        className=" border rounded-lg mb-4 overflow-hidden"
      >
        
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          onClick={() => togglePanel(faq.id)}
        >
          <span className="font-semibold text-md">{faq.question}</span>
          <span
            className={`transform transition-transform ${
              activePanel === faq.id ? 'rotate-180' : ''
            }`}
          >
            {activePanel === faq.id ? (
              <FaChevronDown className="text-md" />
            ) : (
              <FaChevronRight className="text-md" />
            )}
          </span>
        </div>

        {/* FAQ Content */}
        {activePanel === faq.id && (
          <div className="p-4 bg-white">
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        )}
      </div>
    ));
  };

  return (
  <>
  <BreadcrumbBar header="FAQ" name="faqs"/>
    <section className="py-10 md:py-16 px-6 md:px-[6rem]">
      <div className="max-w-5xl mx-auto">
        {/* FAQ Header Section */}
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400  mt-4">
            We will help you grow your career and knowledge.
          </p>
      
        </div> */}

        {/* FAQ Items Section */}
        <div className="flex justify-center items-center">
          <div className="w-full md:w-4/4  space-y-4">{getItems()}</div>
        </div>

      
      </div>
    </section>
  </>
  );
};

export default Faq;
