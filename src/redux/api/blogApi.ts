import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    blogs: build.query({
      query: ({ categoryId, month, year }: { categoryId?: string; month?: number; year?: number }) => {
        let queryString = `${URL}`;
        if (categoryId || month || year) {
          queryString += `?`;
          if (categoryId) queryString += `categoryId=${categoryId}&`;
          if (month) queryString += `month=${month}&`;
          if (year) queryString += `year=${year}&`;
          queryString = queryString.slice(0, -1); 
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: [tagTypes.blog],
    }),

    providerBlogs: build.query({
      query: () => ({
        url : `${URL}/provider`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.blog]
    }),
    blog: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.blog]
    }),

    latestBlogs: build.query({
      query: (blogId) => {
        return {
          url:  `${URL}/latest?blogId=${blogId}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.blog],
    }),

    similarBlogs: build.query({
      query: ({ categoryId, blogId }) => {
        return {
          url:  `${URL}/category/similar?categoryId=${categoryId}&blogId=${blogId}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.blog],
    }),

    addBlog: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.blog]
      }),

    updateBlog: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.blog]
    }),

    
    deleteBlog: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.blog]
    }),

  }),
});

export const { useBlogsQuery,useBlogQuery,useProviderBlogsQuery,useLatestBlogsQuery,useSimilarBlogsQuery,useAddBlogMutation,useUpdateBlogMutation,useDeleteBlogMutation } = blogApi;
