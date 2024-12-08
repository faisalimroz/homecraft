import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/services";
const  CATEGORY = "/categories"

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    overview: build.query({
        query: (arg) => ({
          url : `${URL}/overview`,
          method: "GET" ,
          params: arg
        }),
        
        providesTags:[tagTypes.services]
      }),
    services: build.query({
        query: (arg) => ({
          url : `${URL}`,
          method: "GET" ,
          params: arg
        }),
        
        providesTags:[tagTypes.services]
      }),
    providerServices: build.query({
        query: (arg) => ({
          url : `${URL}/provider`,
          method: "GET" ,
          params: arg
        }),
        
        providesTags:[tagTypes.services]
      }),
    singleProviderService: build.query({
        query: (id) => ({
          url : `${URL}/single-provider/${id}`,
          method: "GET" ,
         
        }),
        
        providesTags:[tagTypes.services]
      }),
    offerServicesProvider: build.query({
        query: (arg) => ({
          url : `${URL}/offer-service/provider`,
          method: "GET" ,
          params: arg
        }),
        
        providesTags:[tagTypes.services]
      }),
    offerServices: build.query({
        query: (arg) => ({
          url : `${URL}/offer-service/`,
          method: "GET" ,
          params: arg
        }),
        
        providesTags:[tagTypes.services]
      }),

    deleteOfferService: build.mutation({
        query: (id:string) => ({
          url : `${URL}/${id}/delete-offer-service`,
          method: "DELETE"
         
        }),
        invalidatesTags:[tagTypes.services]
      }),

    categories: build.query({
        query: () => ({
          url : `${CATEGORY}`,
          method: "GET" ,
        }),
        
        providesTags:[tagTypes.services]
      }),

    service: build.query({
      query: (id:string) => ({
        url : `${URL}/${id}`,
        method: "GET"   
      }),
      
      providesTags:[tagTypes.services]
    }),

    applyOffer: build.mutation({
      query: (data:any) => ({
        url : `${URL}/${data.id}/apply-offer`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.services,tagTypes.offer]
    }),
    
    additionalService: build.query({
      query: (serviceId) => {
        return {
          url:  `${URL}/additional?serviceId=${serviceId}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.services],
    }),

    relatedService: build.query({
      query: ({ categoryId, serviceId }) => {
        return {
          url:  `${URL}/category/similar?categoryId=${categoryId}&serviceId=${serviceId}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.services],
    }),
    popularServices: build.query({
      query: () => {
        return {
          url:  `${URL}/popular-service`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.services],
    }),


    addService: build.mutation({
        query: (data:any) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.services]
      }),

    updateService: build.mutation({
      query: (data:any) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.services]
    }),
    updateServiceStatus: build.mutation({
      query: (data:any) => ({
        url : `${URL}/${data.id}/status`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.services]
    }),

    
    deleteService: build.mutation({
      query: (id:string) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.services]
    }),

  }),
});

export const { useAddServiceMutation,useServicesQuery,useSingleProviderServiceQuery,useProviderServicesQuery,useOfferServicesProviderQuery,useOfferServicesQuery,useDeleteOfferServiceMutation,useApplyOfferMutation,useOverviewQuery,useAdditionalServiceQuery,useRelatedServiceQuery,usePopularServicesQuery,useServiceQuery,useUpdateServiceMutation,useUpdateServiceStatusMutation,useDeleteServiceMutation,useCategoriesQuery } = servicesApi;
