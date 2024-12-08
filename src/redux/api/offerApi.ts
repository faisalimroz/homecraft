import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/offer";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    offers: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.offer],
    }),

  
    addOffer: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.offer]
      }),

    updateOffer: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.offer]
    }),

    
    deleteOffer: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.offer]
    }),

  }),
});

export const { useOffersQuery,useAddOfferMutation,useUpdateOfferMutation,useDeleteOfferMutation} = faqApi;
