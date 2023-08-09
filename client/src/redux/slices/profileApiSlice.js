import{ apiSlice} from './apiSlice.js'
const PROFILE_URL = '/api/profile'

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query({
            query: ()=> ({
                url: `${PROFILE_URL}/getExpenses`, }),
                providesTags: ['Expense'],
            
        }),
        getAvatar: builder.query({
            query: ()=> ({
                url: `${PROFILE_URL}/getAvatar`, }),
                providesTags: ['Avatar'],
            
        }),
        getName: builder.query({
            query: ()=> ({
                url: `${PROFILE_URL}/getName`, }),
                providesTags: ['Username'],
            
        }),
        addExpense: builder.mutation({
            query: (data)=> ({
                url: `${PROFILE_URL}/addExpense`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Expense'],
        }),
        deleteExpense: builder.mutation({
            query: (id)=> ({
                url: `${PROFILE_URL}/deleteExpense/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['Expense'],
        }),
        upload: builder.mutation({
            query: (data)=> ({
                url: `${PROFILE_URL}/upload`,
                method: "PATCH",
                FormData: true,
                body: data
            }),
            invalidatesTags: ['Avatar'],
        }),
        update: builder.mutation({
            query: (data)=> ({
                url: `${PROFILE_URL}/updateProfile`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['Username'],
        }),
        deleteAccount: builder.mutation({
            query: (data)=> ({
                url: `${PROFILE_URL}/deleteProfile`,
                method: "POST",
                body: data
            }),
        }),



    })
})

export const {
    useAddExpenseMutation,
    useDeleteExpenseMutation,
    useGetExpensesQuery,
    useGetNameQuery,
    useGetAvatarQuery,
    useUploadMutation,
    useUpdateMutation,
    useDeleteAccountMutation



} = profileApiSlice