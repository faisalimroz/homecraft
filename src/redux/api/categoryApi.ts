import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build:any) => ({

    categories: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
      providesTags: [tagTypes.category],
    }),

    categoriesName: build.query({
      query: (id : string) => ({
        url : `${URL}/name`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.category]
    }), 

    category: build.query({
      query: (id : string) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.category]
    }), 

    addCategory: build.mutation({
        query: (data : any) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.category]
      }),

    updateCategory: build.mutation({
      query: (data : any) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.category]
    }),

    
    deleteCategory: build.mutation({
      query: (id : string) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.category]
    }),

  }),
  
});

export const { useAddCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useCategoryQuery,useCategoriesQuery,useCategoriesNameQuery } = categoryApi;
