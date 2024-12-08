import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/combo-pack";

export const comboPackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    combosForProvider: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.combo],
    }),
    combos: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.combo],
    }),

    combo: build.query({
      query: (id) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.combo],
    }),

    addCombo: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.combo]
      }),
   updateCombo: build.mutation({
        query: (data) => ({
          url : `${URL}/${data.id}`,
          method: "PATCH",
          data:data.body
        }),
        invalidatesTags:[tagTypes.combo]
      }),
   deleteCombo: build.mutation({
        query: (id) => ({
          url : `${URL}/delete/${id}`,
          method: "DELETE",
          
        }),
        invalidatesTags:[tagTypes.combo]
      }),

  }),
});

export const {useCombosQuery,useCombosForProviderQuery,useComboQuery,useAddComboMutation,useUpdateComboMutation,useDeleteComboMutation } = comboPackApi;
