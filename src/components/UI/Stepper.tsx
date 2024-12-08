"use client";
import React from "react";
import { FaCalendarAlt, FaCheck, FaCog } from "react-icons/fa"; // Import your icons

// Define the type for a single step, now with an icon property
interface Step {
  title: string;
  description: string;
  icon: React.ReactNode; // Icon can be any valid React node (e.g., an icon component)
}

// Define the props for the Stepper component
interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex-row md:flex justify-center mb-6 md:space-x-4">
      {steps.map((step, index) => {
        const isActive = currentStep >= index + 1;
        return (
          <button
            key={index}
         
            className={`flex items-center p-4 w-full ${
              isActive
                ? "border-b-4 border-[#4c40ed]"
                : "border-b-4 border-gray-200 opacity-50"
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${
                isActive ? "bg-[#4c40ed]" : "bg-gray-300"
              }`}
            >
              {/* Render the step's specific icon */}
              <div className={`${isActive ? "text-white" : "text-gray-500"} text-xl`}>
                {step.icon}
              </div>
            </div>
            <div className="ml-4 text-left">
              <h1 className="text-lg font-semibold">{step.title}</h1>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Stepper;
