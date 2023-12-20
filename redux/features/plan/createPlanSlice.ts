import { createPlan } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const planCreate =createAsyncThunk("/plan/planCreate",
async(data:any)=>{
    const res = await createPlan(data)
    console.log(res,'res thunk');
    
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

const planCreateSlice = createSlice({
    name:'plan',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(planCreate.pending,(state:IPlanState)=>{
            state.isLoading= true
        });
        builder.addCase(planCreate.fulfilled,(state:IPlanState, action)=>{
            state.isLoading= false
            state.plan=action.payload
            state.error=null
        });
        builder.addCase(planCreate.rejected,(state:IPlanState,action)=>{
            state.isLoading= false
            state.plan= {}
            state.error=action.error.message
        })

    }
})

export default planCreateSlice.reducer