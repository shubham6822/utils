import { apiService as api } from "app/store/apiService";
import {
  ApiResponse,
  CreatePayload,
  DeletePayload,
  UpdatePayload,
} from "src/app/utils/commonApi.types";
import { test } from "./test.type";

const tagTypes = ["tests", "test"] as const;

const testApi = api
  .enhanceEndpoints({
    addTagTypes: tagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createtest: build.mutation<ApiResponse<test[]>, CreatePayload<test>>({
        query: (data) => ({
          url: "/tests",
          method: "POST",
          data,
        }),
        invalidatesTags: ["test"],
      }),
      gettests: build.query<ApiResponse<test[]>, void>({
        query: () => ({ url: "/tests" }),
        providesTags: ["test"],
      }),
      gettestsByHostCompany: build.query<ApiResponse<test[]>, string>({
        query: (companyId) => ({
          url: `tests/get-by/host-company/${companyId}`,
        }),
        providesTags: ["test"],
      }),
      gettestById: build.query<ApiResponse<test>, string>({
        query: (testId) => ({ url: `/tests/${testId}` }),
        providesTags: ["test", "tests"],
      }),
      updatetest: build.mutation<ApiResponse<test[]>, UpdatePayload<test>>({
        query: ({ id, data }) => ({
          url: `/tests/${id}`,
          method: "PATCH",
          data,
        }),
        invalidatesTags: ["tests", "test"],
      }),
      deletetest: build.mutation<ApiResponse<test[]>, DeletePayload>({
        query: ({ id, data }) => ({
          url: `/tests/${id}`,
          method: "DELETE",
          data: { securityEntry: data },
        }),
        invalidatesTags: ["tests", "test"],
      }),
    }),
    overrideExisting: false,
  });

export default testApi;

export const {
  useCreatetestMutation,
  useGettestsQuery,
  useGettestsByHostCompanyQuery,
  useGettestByIdQuery,
  useUpdatetestMutation,
  useDeletetestMutation,
} = testApi;
