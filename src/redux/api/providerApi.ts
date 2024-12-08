
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { table } from "console";

const  URL = "/provider";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

  
    providers: build.query({
      query: () => ({
        url : `${URL}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.provider]
    }),
    providersForAdmin: build.query({
      query: () => ({
        url : `${URL}/admin`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.provider]
    }),

    providerById: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.provider]
    }),


    updateProvider: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.provider,tagTypes.user]
    }),
    updateProviderStatus: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}/status`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.provider]
    }),

    deleteProvider: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.provider]
    }),

   

  }),
});

export const {useProvidersQuery,useProvidersForAdminQuery,useProviderByIdQuery,useUpdateProviderMutation,useUpdateProviderStatusMutation,useDeleteProviderMutation} = providerApi;
