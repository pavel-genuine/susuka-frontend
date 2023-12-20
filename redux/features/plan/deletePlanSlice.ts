import { deletePlan } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const planDelete =createAsyncThunk("/plan/planDelete",
async(data)=>{
    const res = await deletePlan(data)
    return res?.data;
})



interface IPlanState {
    plan:{},
    isLoading: boolean 
    error: any
}

const initialState:IPlanState = {
    plan: {},
    isLoading: false,
    error: null
} 

const planDeleteSlice = createSlice({
    name:'plan',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(planDelete.pending,(state:IPlanState)=>{
            state.isLoading= true
        });
        builder.addCase(planDelete.fulfilled,(state:IPlanState, action)=>{
            state.isLoading= false
            state.plan=action.payload
            state.error=null
        });
        builder.addCase(planDelete.rejected,(state:IPlanState,action)=>{
            state.isLoading= false
            state.plan= {}
            state.error=action.error.message
        })

    }
})

export default planDeleteSlice.reducer