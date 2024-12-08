
import { baseApi } from "./baseApi";


const  URL = "/feedback";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    postFeedBack: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
      
      }),

  
    
    

  }),
});

export const {  usePostFeedBackMutation } = feedbackApi;
