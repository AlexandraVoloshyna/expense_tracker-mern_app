import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from './authSlice';


const baseQuery = fetchBaseQuery({ 
  baseUrl: 'https://expense-tracker-server-rp9x.onrender.com',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
        headers.set("authorization", `Bearer ${token}`)
    }
    return headers
}
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    try {
      const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions) 
      if(refreshResult.data){
        api.dispatch(setCredentials(refreshResult.data))
        result = await baseQuery(args, api, extraOptions)
      }
      
      
    } catch (error) {
        console.log(error)
        api.dispatch(clearCredentials());
        const logoutMutation = api.endpoints.logout.initiate({}); 
        result = await logoutMutation.unwrap();
        }
    }
       return result
}




export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Expense', 'Username', 'Avatar'],
  endpoints: (builder) => ({}),
});