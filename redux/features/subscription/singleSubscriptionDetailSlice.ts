import { getSingleSubscriptionDetail } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchSingleSubscriptionDetail =createAsyncThunk("/singleSubscriptionDetail/fetctSingleSubscriptionDetail",
async(id:any)=>{
    const res = await getSingleSubscriptionDetail(id)
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

const singleSubscriptionDetailSlice = createSlice({
    name:'singleSubscriptionDetail',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(fetchSingleSubscriptionDetail.pending,(state:ISubscriptionState)=>{
            state.isLoading= true
        });
        builder.addCase(fetchSingleSubscriptionDetail.fulfilled,(state:ISubscriptionState, action)=>{
            state.isLoading= false
            state.subscription=action.payload
            state.error=null
        });
        builder.addCase(fetchSingleSubscriptionDetail.rejected,(state:ISubscriptionState,action)=>{
            state.isLoading= false
            state.subscription= {}
            state.error=action.error.message
        })

    }
})

export default singleSubscriptionDetailSlice.reducer