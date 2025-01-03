import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import jwtAuthConfig from '../auth/services/jwt/jwtAuthConfig';

const axiosBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig<unknown>, unknown, AxiosError> =>
		async ({ url, method, data, params }) => {
			try {
				const accessToken = localStorage.getItem(jwtAuthConfig.tokenStorageKey);
				const language = localStorage.getItem('i18n') || 'de';

				Axios.defaults.baseURL = import.meta.env.VITE_API_URL;
				const result = await Axios({
					url,
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': accessToken,
						language: language === 'en' ? 'gb' : 'de'
					},
					method,
					data,
					params
				});
				return { data: result.data };
			} catch (axiosError) {
				const error = axiosError as AxiosError;
				return {
					error
				};
			}
		};

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	reducerPath: 'apiService'
});

export default apiService;
