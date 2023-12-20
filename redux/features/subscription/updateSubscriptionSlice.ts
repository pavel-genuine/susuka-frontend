import { updateSubscription } from "@/api/api";
import { ISubscription } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialUser } from "../user/ownProfileSlice";


const initialSubscription={
    id: 0,
    userId:0,
    user:initialUser,
    planId: 0,    
    wordCredit: 0,
    paidBy: '',
    paidAt: '',
    paymentId: '',
  }

export const subscriptionUpdate =createAsyncThunk("/subscription/subscriptionUpdate",
async({id,data}:any)=>{

    // const {id,data}=info;

    const res = await updateSubscription(id,data)

    console.log(res,'res thunk');
    
    return res?.data ;
})



interface ISubscriptionState {
    subscription:ISubscription,
    isLoading: boolean 
    error: any
}

const initialState:ISubscriptionState = {
    subscription:initialSubscription,
    isLoading: false,
    error: null
} 

const subscriptionUpdateSlice = createSlice({
    name:'subscription',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(subscriptionUpdate.pending,(state:ISubscriptionState)=>{
            state.isLoading= true
        });
        builder.addCase(subscriptionUpdate.fulfilled,(state:ISubscriptionState, action)=>{
            state.isLoading= false
            state.subscription=action.payload
            state.error=null
        });
        builder.addCase(subscriptionUpdate.rejected,(state:ISubscriptionState,action)=>{
            state.isLoading= false
            state.subscription= initialSubscription
            state.error=action.error.message
        })

    }
})

export default subscriptionUpdateSlice.reducer