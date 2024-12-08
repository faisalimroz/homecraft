"use client";
import Loader from '@/components/UI/Loader';
import { useAddAvailbilityMutation, useAvailbilitiesForProviderQuery, useDeleteAvailbilityMutation } from '@/redux/api/availbility';
import React, { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from 'react';

// Define types for the state and slot
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" | "All day";
type AvailabilityState = {
    [key in Day]: string[];
};

const Availability: React.FC = () => {
    const [addAvailbility] = useAddAvailbilityMutation(); // API mutation hook
    const { data, isLoading } = useAvailbilitiesForProviderQuery(undefined);
    const [deleteAvailbility] = useDeleteAvailbilityMutation();

  
    const [availability, setAvailability] = useState<AvailabilityState>({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
        "All day": []
    });
    // console.log(availability);
    
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const [inputValues, setInputValues] = useState<{ [key in Day]?: string }>({});

    // Update availability state when data is fetched
    useEffect(() => {
        if (data && data.success) {
            const fetchedAvailability = data.data;
            setAvailability(prev => ({
                ...prev,
                Monday: fetchedAvailability.Monday || [],
                Tuesday: fetchedAvailability.Tuesday || [],
                Wednesday: fetchedAvailability.Wednesday || [],
                Thursday: fetchedAvailability.Thursday || [],
                Friday: fetchedAvailability.Friday || [],
                Saturday: fetchedAvailability.Saturday || [],
                Sunday: fetchedAvailability.Sunday || [],
                "All day": fetchedAvailability["All day"] || []
            }));
        }
    }, [data]);

    // Function to add a slot
    const addSlot = (day: Day, slot: string) => {
        if (day === "All day") {
            setAvailability(prev => {
                const updatedAvailability = { ...prev };
                Object.keys(updatedAvailability).forEach(d => {
                    const key = d as Day;
                    updatedAvailability[key] = [...updatedAvailability[key], slot];
                });
                return updatedAvailability;
            });
        } else {
            setAvailability(prev => ({
                ...prev,
                [day]: [...prev[day], slot]
            }));
        }
    };

    // Function to remove a slot
    const removeSlot = async (day: Day, index: number) => {
        const slotToRemove = availability[day][index];
        const data = {day:day,slot:slotToRemove}
      
    
        // Call the deleteAvailbility mutation with correct parameters
        await deleteAvailbility(data);
      };
      
    
    // Function to handle adding slot
    const handleAddSlot = (day: Day) => {
        const value = inputValues[day];
        if (value) {
            const formattedSlot = formatTime(value);
            addSlot(day, formattedSlot);
            setInputValues(prev => ({ ...prev, [day]: '' }));
        }
    };

    // Function to format time
    const formatTime = (time: string) => {
        const [hour, minute] = time.split(':');
        const hourInt = parseInt(hour, 10);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const formattedHour = hourInt % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    // Handle form submit
    const handleSubmit = (day: Day) => async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const value = inputValues[day];
        if (value) {
            const formattedSlot = formatTime(value);
            
            // Prepare the data in the required format for the API
            const postData: { [key: string]: string[] } = {};
            if (day === "All day") {
                // When "All day" is selected, send all slots for all days
                postData["All day"] = [formattedSlot];
                Object.keys(availability).forEach((key) => {
                    if (key !== "All day") {
                        postData[key] = [...availability[key as Day], formattedSlot];
                    }
                });
            } else {
                postData[day] = [...availability[day], formattedSlot];
            }
            
            // Make the API call to add availability
            try {
                // console.log(postData, '105');
                await addAvailbility(postData).unwrap();
                handleAddSlot(day);
            } catch (error) {
                console.error("Failed to add availability:", error);
            }
        }
        
        setSelectedDay(null);
    };

    // Handle input change
    const handleChange = (day: Day) => (e: ChangeEvent<HTMLInputElement>) => {
        setInputValues(prev => ({ ...prev, [day]: e.target.value }));
    };

    // Handle input focus
    const handleFocus = (day: Day) => (e: FocusEvent<HTMLInputElement>) => {
        setSelectedDay(day);
        e.target.showPicker();
    };

    // Handle input blur
    const handleBlur = (day: Day) => () => {
        if (inputValues[day]) {
            handleAddSlot(day);
        }
        setSelectedDay(null);
    };

    if(isLoading){
        return <div>|<Loader/> </div>
    }
    

    return (
        <div className="max-w-3xl px-6 py-7">
            <h2 className="text-2xl font-semibold text-[#2a2a3d] mb-6">Service Booking Availability</h2>
            <div className="bg-white py-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All day</h2>
                <form onSubmit={handleSubmit("All day")} className="flex gap-4 mb-4">
                    <div className="relative flex-1">
                        <input
                            type="time"
                            name="slot"
                            required
                            value={inputValues["All day"] || ''}
                            className="border border-gray-300 rounded-md p-2 w-full appearance-none"
                            style={{ outline: 'none', color: inputValues["All day"] ? 'black' : 'transparent' }}
                            onFocus={handleFocus("All day")}
                            onBlur={() => handleBlur("All day")}
                            onChange={handleChange("All day")}
                        />
                        {!inputValues["All day"] && selectedDay !== "All day" && (
                            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none select-none">
                                Select Time
                            </span>
                        )}
                    </div>
                    <button type="submit" className="bg-[#4f46e5] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Add Slot</button>
                </form>
                <ul className="list-none p-0">
                    {availability["All day"].map((slot, index) => (
                        <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            {slot}
                            <button onClick={() => removeSlot("All day", index)} className="text-red-500 hover:text-red-600 transition-colors">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            {Object.keys(availability).filter(day => day !== "All day").map(day => (
                <div key={day} className="bg-white py-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">{day}</h2>
                    <form onSubmit={handleSubmit(day as Day)} className="flex gap-4 mb-4">
                        <div className="relative flex-1">
                            <input
                                type="time"
                                name="slot"
                                required
                                value={inputValues[day as Day] || ''}
                                className="border border-gray-300 rounded-md p-2 w-full appearance-none"
                                style={{ outline: 'none', color: inputValues[day as Day] ? 'black' : 'transparent' }}
                                onFocus={handleFocus(day as Day)}
                                onBlur={() => handleBlur(day as Day)}
                                onChange={handleChange(day as Day)}
                            />
                            {!inputValues[day as Day] && selectedDay !== day && (
                                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none select-none">
                                    Select Time
                                </span>
                            )}
                        </div>
                        <button type="submit" className="bg-[#4f46e5] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Add Slot</button>
                    </form>
                    <ul className="list-none p-0">
                        {availability[day as Day].map((slot, index) => (
                            <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                                {slot}
                                <button onClick={() => removeSlot(day as Day, index)} className="text-red-500 hover:text-red-600 transition-colors">Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Availability;
