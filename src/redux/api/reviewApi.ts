import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/reviews";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    reviews: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.review],
    }),

    reviewByServiceId: build.query({
      query: (id:string) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.review],
    }),
    reviewByProviderId: build.query({
      query: (id:string) => {
        return {
          url: `${URL}/provider/${id}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.providerReview],
    }),

 
    addReview: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.review,tagTypes.services]
      }),
 
    addProviderReview: build.mutation({
        query: (data) => ({
          url : `${URL}/provider`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.providerReview,tagTypes.provider]
      }),

    
      deleteReview: build.mutation({
        query: (id) => ({
          url : `${URL}/${id}`,
          method: "DELETE"
         
        }),
        invalidatesTags:[tagTypes.review]
      }),

    
   

  }),
});

export const { useAddReviewMutation,useReviewByProviderIdQuery,useAddProviderReviewMutation,useReviewsQuery,useReviewByServiceIdQuery,useDeleteReviewMutation } = reviewApi;
