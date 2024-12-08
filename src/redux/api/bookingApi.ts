
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/booking";
const  STATISTIC_URL = "/booking/statistics";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    bookings: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.availbility,tagTypes.booking],
    }),
    bookingsForUser: build.query({
      query: () => {
        return {
          url: `${URL}/user`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.booking],
    }),

    booking: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.availbility ,tagTypes.booking]
    }),

    addBooking: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.availbility,tagTypes.booking]
      }),
    addComboBooking: build.mutation({
        query: (data) => ({
          url : `/combo-booking`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.comboBooking]
      }),

    updateBooking: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.availbility , tagTypes.booking]
    }),

    
    deleteBooking: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.availbility , tagTypes.booking]
    }),

    getStatistics: build.query({
      query: () => ({
        url : `${STATISTIC_URL}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.user , tagTypes.booking,tagTypes.services]
    }),

    checkAvailableSlot: build.query({
        query: (bookingDate) => ({
          url : `${URL}/check-available-slot?bookingDate=${bookingDate}`,
          method: "GET" ,
        }),
        providesTags:[tagTypes.booking]
        
      }),

  }),
});

export const { useBookingsQuery,useBookingsForUserQuery,useBookingQuery,useAddBookingMutation,useAddComboBookingMutation,useUpdateBookingMutation,useDeleteBookingMutation,useCheckAvailableSlotQuery,useGetStatisticsQuery } = bookingApi;
