"use client";
import { useAvailbilitiesQuery } from '@/redux/api/availbility';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Loader from './Loader';
import { usePathname, useRouter } from 'next/navigation';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import { useAddBookingMutation, useCheckAvailableSlotQuery } from '@/redux/api/bookingApi';



const Appointment= ({providerId}:any) => {
    // console.log(providerId,'13')
    const {push} = useRouter();
    const pathname = usePathname();
    const todayDate = new Date();
    const [date, setDate] = useState<Date>(todayDate);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const { data, isLoading, refetch } = useAvailbilitiesQuery(providerId);
    const { data: userData } = useLoggedUserQuery(undefined);
    const [addBooking] = useAddBookingMutation();
    const formattedDate = formatDateToISO(date);
    const { data: checkAvailableSlotData } = useCheckAvailableSlotQuery(formattedDate);

    const serviceId = pathname?.split('/')[1]; 
    const userId = userData?.data?.id;
    // console.log(userId,'28')

    
    const bookedTimes = checkAvailableSlotData?.data?.map((slot: any) => slot.Time) || [];

    useEffect(() => {
        if (data) {
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const timesForDay = data.data[dayOfWeek] || [];
            setAvailableTimes(timesForDay);
            setSelectedTime(null);
        }
        refetch();
    }, [date, data, refetch]);

    const onChange = (newDate:any) => {
        setDate(newDate);
        const dayOfWeek = newDate.toLocaleDateString('en-US', { weekday: 'long' });
        // console.log(`Selected Date: ${formatDateToISO(newDate)}, Day: ${dayOfWeek}`);
    };

    const onTimeSelect = (time: string) => {
        if (!bookedTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    function formatDateToISO(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00.000Z`;
    }

    const handleBooking = async () => {
        if (date && selectedTime) {
            const selectedDate = formatDateToISO(date);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          
            try {
                const res = await addBooking({ bookingDate: selectedDate, day: dayOfWeek, time: selectedTime, serviceId, userId }).unwrap();
        
                if (res?.data) {
                   
                    push(`/checkout/${res?.data?.id}`);
                }
              
            } catch (error) {
                console.error('Error booking appointment:', error);
            }
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="md:flex md:space-x-6 mt-6 py-8">
            <div>
                <h6 className="text-lg font-semibold mb-5">Appointment Date</h6>
                <Calendar onChange={onChange} value={date} className="custom-calendar" />
            </div>
            <div className="md:px-12 py-4 md:py-0">
                <h6 className="text-lg font-semibold mb-5">Appointment Time</h6>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
                    {availableTimes.length > 0 ? (
                        availableTimes.map((time, index) => (
                            <div
    key={index}
    onClick={() => !bookedTimes.includes(time) && onTimeSelect(time)}
    className={`border border-gray-200 shadow-sm flex items-center justify-center px-2 py-4 rounded-lg font-medium text-sm ${
        bookedTimes.includes(time)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : selectedTime === time
            ? 'bg-[#4c40ed] text-white'
            : 'bg-[#f8fcfd] text-gray-600 hover:text-white hover:bg-[#4c40ed] cursor-pointer'
    }`}
    aria-disabled={bookedTimes.includes(time)}
>
    {time}
</div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-xl font-semibold text-gray-700 bg-[#f0f5f9] rounded-lg p-6 shadow-md">
                                No available times for this day.
                            </p>
                        </div>
                    )}
                </div>
                {availableTimes.length > 0 && (
                    <div className="flex justify-end mt-6 space-x-4">
                        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-300">
                            Cancel
                        </button>
                        <button
                            onClick={handleBooking}
                            className={`py-3 px-4 rounded-md shadow-sm ${
                                date && selectedTime
                                    ? 'text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white cursor-pointer'
                                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            }`}
                            disabled={!date || !selectedTime}
                        >
                            Book Appointment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointment;
