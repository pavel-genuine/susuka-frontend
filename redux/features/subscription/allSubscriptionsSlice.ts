import { getAllSubscriptions } from "@/api/api";
import { ISubscription } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





export const fetchAllSubscriptions = createAsyncThunk("/allSubscriptions/fetchAllSubscriptions",
    async () => {
        const res = await getAllSubscriptions()
        return res?.data as any
    })


interface ISubscriptionsState {
    subscriptions:ISubscription []
    isLoading: boolean
    error: any
}

const initialState:ISubscriptionsState = {
    subscriptions: [],
    isLoading:false,
    error: null
} 

const allSubscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllSubscriptions.pending, (state:ISubscriptionsState) => {
            state.isLoading = true
        });
        builder.addCase(fetchAllSubscriptions.fulfilled, (state:ISubscriptionsState, action) => {
            state.isLoading = false
            state.subscriptions = action.payload
            state.error = null
        });
        builder.addCase(fetchAllSubscriptions.rejected, (state:ISubscriptionsState, action) => {
            state.isLoading = false
            state.subscriptions = []
            state.error = action.error.message
        })

    }
})

export default allSubscriptionsSlice.reducer