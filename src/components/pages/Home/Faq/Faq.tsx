"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useFaqsQuery } from '@/redux/api/faqApi';
import FaqSkeleton from './FaqSkeleton';

const Faq = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { data, isLoading } = useFaqsQuery(undefined);

  const faqs = data?.data || [];

  const togglePanel = (panelId: string) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId));
  };

 
  const displayedFaqs = faqs.slice(0, 6);

  const getItems = () => {
    if (isLoading) {
      return Array(6).fill(null).map((_, index) => (
        <FaqSkeleton key={`skeleton-${index}`} />
      ));
    }

    if (!displayedFaqs.length) return [];

    return displayedFaqs.map((faq: any) => (
      <div
        key={faq.id}
        className="border rounded-lg mb-4 overflow-hidden"
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
    <section className="py-10 md:py-14 px-6 md:px-16 main">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 mt-4">
            We will help you grow your career and knowledge.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full md:w-4/4 space-y-4">{getItems()}</div>
        </div>

        <div className="text-center mt-8">
          <Link href="/faqs">
            <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-600 hover:text-white">
              See More FAQs
              <FaChevronRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faq;

