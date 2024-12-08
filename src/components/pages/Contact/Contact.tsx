"use client"
import React, { useRef, useState } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';
import BreadcrumbBar from '@/components/UI/BreadcrumbBar';
import ContactImage from '../../../../public/assets/istockphoto-1226023669-612x612.jpg';
import emailjs from "@emailjs/browser";
import { ShowToast } from '@/components/UI/ShowToast';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  
 
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });


  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

  
    const formElements = form.current; 

    if (formElements) {
      const name = formElements.elements.namedItem("name") as HTMLInputElement;
      const email = formElements.elements.namedItem("email") as HTMLInputElement;
      const subject = formElements.elements.namedItem("subject") as HTMLInputElement;
      const message = formElements.elements.namedItem("message") as HTMLTextAreaElement;

      if (!name.value) {
        newErrors.name = 'Name is required.';
        isValid = false;
      }
      
      if (!email.value) {
        newErrors.email = 'Email is required.';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        newErrors.email = 'Email address is invalid.';
        isValid = false;
      }
      
      if (!subject.value) {
        newErrors.subject = 'Subject is required.';
        isValid = false;
      }
      
      if (!message.value) {
        newErrors.message = 'Message is required.';
        isValid = false;
      }
    }

    setErrors(newErrors); 
    return isValid; 
  };

 
 
const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (validateForm()) { 
    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',  
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', 
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''      
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result.text);
            ShowToast({ message: 'Email Sent Successfully' });
            (e.currentTarget as HTMLFormElement).reset(); // Cast currentTarget to HTMLFormElement to access reset
            setErrors({ name: '', email: '', subject: '', message: '' }); // Clear errors
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            toast.error("Failed to send email.");
          }
        );
    }
  }
};

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BreadcrumbBar header="Contact" name="Contact"/>
      <div className="py-10 md:py-16 px-6 md:px-[6rem] main">
        {/* Contact Information Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Card 1 - Phone */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <FiPhone className="text-4xl text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Call Us</h3>
            <p className="text-lg text-gray-600">
              Have a question or want to talk to a representative? Give us a call and we’ll be happy to assist.
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-4">+88 01858832211</p>
          </div>

          {/* Contact Card 2 - Email */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <FiMail className="text-4xl text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Email Us</h3>
            <p className="text-lg text-gray-600">
              Send us an email and our team will get back to you within 24 hours. We’d love to hear from you.
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-4">mikatsyed@gmail.com</p>
          </div>

          {/* Contact Card 3 - Location */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-6">
              <FiMapPin className="text-4xl text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Visit Us</h3>
            <p className="text-lg text-gray-600">
              Come visit us at our headquarters or one of our branch offices. We’d be delighted to welcome you.
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-4">Muradpur, Chittagong (Bangladesh)</p>
          </div>
        </div>

        <div className="rounded-xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center pr-6">
            <Image
              src={ContactImage} 
              alt="Contact Us"
              className="rounded-lg shadow-lg image-fluid w-full"
              width={500} 
              height={600} 
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 mt-[2rem]">Send Us a Message</h2>
            <form className="space-y-6" ref={form} onSubmit={sendEmail}>
              {/* Name Input */}
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="w-full">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>} {/* Error Message */}
                </div>
                {/* Email Input */}
                <div className="w-full">
                  <label className="block text-lg text-gray-700 mb-2" htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} {/* Error Message */}
                </div>
              </div>
              {/* Subject Input */}
              <div>
                <label className="block text-lg text-gray-700 mb-2" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Subject"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>} {/* Error Message */}
              </div>
              {/* Message Text Area */}
              <div>
                <label className="block text-lg text-gray-700 mb-2" htmlFor="message">Message</label>
                <textarea
                  name="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-40"
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>} {/* Error Message */}
              </div>
              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Location</h2>
          <div className="relative w-full h-96 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.500620343743!2d-122.08574958434255!3d37.42199987982244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24c6b3b9c1d%3A0x8c3e02383ddf1a15!2sGoogleplex!5e0!3m2!1sen!2sus!4v1618329790180!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="absolute inset-0 border-none"
              loading="lazy"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
