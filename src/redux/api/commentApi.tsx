import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/comments";

export const  commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    comments: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.comment],
    }),

    commentByBlogId: build.query({
      query: (id:string) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.comment],
    }),

 
    addComment: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.comment]
      }),

  

    
   

  }),
});

export const { useCommentsQuery,useCommentByBlogIdQuery,useAddCommentMutation } = commentApi;
