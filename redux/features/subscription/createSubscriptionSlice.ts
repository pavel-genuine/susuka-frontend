import { createSubscription } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const subscriptionCreate =createAsyncThunk("/subscription/subscriptionCreate",
async(data:any)=>{
    const res = await createSubscription(data)
    console.log(res,'res thunk');
    
    return res?.data;
})



interface ISubscriptionState {
    subscription:any,
    isLoading: boolean 
    error: any
}

const initialState:ISubscriptionState = {
    subscription: {},
    isLoading: false,
    error: null
} 

const subscriptionCreateSlice = createSlice({
    name:'subscription',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(subscriptionCreate.pending,(state:ISubscriptionState)=>{
            state.isLoading= true
        });
        builder.addCase(subscriptionCreate.fulfilled,(state:ISubscriptionState, action)=>{
            state.isLoading= false
            state.subscription=action.payload
            state.error=null
        });
        builder.addCase(subscriptionCreate.rejected,(state:ISubscriptionState,action)=>{
            state.isLoading= false
            state.subscription= {}
            state.error=action.error.message
        })

    }
})

export default subscriptionCreateSlice.reducer