import React from 'react';

const BookingPayment = ({ onNext }:any) => {
    return (
        <div className=" flex items-center justify-center p-6">
            <div className="max-w-3xl w-full  bg-[#f8fcfd]  rounded-lg overflow-hidden">
                <div className=" p-6">
                    <h2 className="text-3xl font-bold text-gray-600 text-center">Booking Summary</h2>
                </div>
                <div className="p-8">
                    <div className="flex items-center mb-6">
                        <img src="https://truelysell.dreamstechnologies.com/html/template/assets/img/booking.jpg" alt="Car Wash" className="w-12 h-12 mr-4" />
                        <div>
                            <p className="text-gray-800 text-xl font-semibold">Car Wash</p>
                            <p className="text-gray-600">Car Repair Services</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-700">Rating</p>
                            <p className="text-gray-700 font-semibold">4.9 (255 reviews)</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-700">Location</p>
                            <p className="text-gray-700 font-semibold">Alabama, USA</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-700">Date</p>
                            <p className="text-gray-700 font-semibold">07/09/2023</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-700">Time</p>
                            <p className="text-gray-700 font-semibold">12:30 PM - 01:00 PM</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-700">Service Provider</p>
                            <p className="text-gray-700 font-semibold">Thomas Herzberg</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700 font-semibold">$150.00</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-700">Coupon Discount</p>
                            <p className="text-green-600 font-semibold">- $5.00</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-700">Service Charges</p>
                            <p className="text-gray-700 font-semibold">$3.00</p>
                        </div>
                        <div className="flex justify-between text-lg font-semibold mt-4">
                            <p className="text-gray-800">Total</p>
                            <p className="text-gray-800">$148.00</p>
                        </div>
                        {/* <div className="mt-2 text-sm text-green-600">
                            Your total saving on this order is $5.00
                        </div> */}
                    </div>

                    {/* <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="w-full bg-blue-600 text-white mt-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Apply Coupon
                        </button>
                    </div> */}

<div className='flex mt-2'>
  <button
    onClick={onNext}
    className="bg-[#4c40ed] text-white hover:text-[#4c40ed] border border-[#4c40ed] mt-4 py-3 px-2 md:px-20  lg:px-24 rounded-lg hover:bg-white mr-4 transition-colors duration-300">
    Proceed to Pay $120
  </button>
  
  <button
    className="bg-[#f8fcfd] text-[#4c40ed] text-sm hover:text-white mt-4 py-3 px-6 rounded-lg border border-[#4c40ed] hover:bg-[#4c40ed] transition-colors duration-300">
    Skip
  </button>
</div>

                </div>
            </div>
        </div>
    );
};

export default BookingPayment;
