import { getSinglePlanDetail } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchSinglePlanDetail =createAsyncThunk("/singlePlanDetail/fetctSinglePlanDetail",
async(id)=>{
    const res = await getSinglePlanDetail(id)
    return res?.data;
})



interface IPlanState {
    Plan:{},
    isLoading: boolean 
    error: any
}

const initialState:IPlanState = {
    Plan: {},
    isLoading: false,
    error: null
} 

const singlePlanDetailSlice = createSlice({
    name:'singlePlanDetail',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(fetchSinglePlanDetail.pending,(state:IPlanState)=>{
            state.isLoading= true
        });
        builder.addCase(fetchSinglePlanDetail.fulfilled,(state:IPlanState, action)=>{
            state.isLoading= false
            state.Plan=action.payload
            state.error=null
        });
        builder.addCase(fetchSinglePlanDetail.rejected,(state:IPlanState,action)=>{
            state.isLoading= false
            state.Plan= {}
            state.error=action.error.message
        })

    }
})

export default singlePlanDetailSlice.reducer