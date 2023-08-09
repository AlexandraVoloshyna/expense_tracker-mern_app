import{ apiSlice} from './apiSlice.js'
const USERS_URL = '/api/auth'

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data

            }),
           
        }),
        logout: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
        registration: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/registration`,
                method: "POST",
                body: data
            }),
        }),
        resetPassword: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/resetPassword`,
                method: "PATCH",
                body: data
            }),
        }),

    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegistrationMutation,
    useResetPasswordMutation

} = userApiSlice