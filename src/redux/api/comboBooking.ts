
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/combo-booking";

export const comboBookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    
    comboBookings: build.query({
      query: () => ({
        url : `${URL}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.comboBooking]
    }),
    comboBookingsForProvider: build.query({
      query: () => ({
        url : `${URL}/provider`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.comboBooking]
    }),
    
    comboBooking: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.comboBooking]
    }),

   
    addComboBooking: build.mutation({
        query: (data) => ({
          url : URL,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.comboBooking]
      }),

      updateComboBooking: build.mutation({
        query: (data) => ({
          url : `${URL}/${data.id}`,
          method: "PATCH",
          data:data.body
        }),
        invalidatesTags:[ tagTypes.comboBooking]
      }),
  

  }),
});

export const { useAddComboBookingMutation,useComboBookingQuery,useComboBookingsQuery,useComboBookingsForProviderQuery,useUpdateComboBookingMutation} = comboBookingApi;
