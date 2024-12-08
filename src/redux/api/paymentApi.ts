import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const payment = "/payment";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    payments: build.query({
      query: () => {
        return {
          url: payment,
          method: "GET"
        };
      },
      providesTags: [tagTypes.payment],
    }),

  

    initialPayment: build.mutation({
      query: (data: any) => ({
        url: `${payment}/init`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    initialPaymentForCombo: build.mutation({
      query: (data: any) => ({
        url: `${payment}/init/combo`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

  }),
});

export const { usePaymentsQuery, useInitialPaymentMutation,useInitialPaymentForComboMutation } = paymentApi;

export default paymentApi;
