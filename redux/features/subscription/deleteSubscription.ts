import { deleteSubscription } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const subscriptionDelete =createAsyncThunk("/subscription/subscriptionDelete",
async(data:any)=>{
    const res = await deleteSubscription(data)
    return res?.data;
})



interface ISubscriptionState {
    subscription:{},
    isLoading: boolean 
    error: any
}

const initialState:ISubscriptionState = {
    subscription: {},
    isLoading: false,
    error: null
} 

const subscriptionDeleteSlice = createSlice({
    name:'subscription',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(subscriptionDelete.pending,(state:ISubscriptionState)=>{
            state.isLoading= true
        });
        builder.addCase(subscriptionDelete.fulfilled,(state:ISubscriptionState, action)=>{
            state.isLoading= false
            state.subscription=action.payload
            state.error=null
        });
        builder.addCase(subscriptionDelete.rejected,(state:ISubscriptionState,action)=>{
            state.isLoading= false
            state.subscription= {}
            state.error=action.error.message
        })

    }
})

export default subscriptionDeleteSlice.reducer