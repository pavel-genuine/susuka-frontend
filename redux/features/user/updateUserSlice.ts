import { getUserProfileInfo, updateUserProfile } from "@/api/api";
import { IUser } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialUser } from "./ownProfileSlice";


export const updateProfile =createAsyncThunk("/userProfile/updateProfile",
async({id,data}:any)=>{
    const res = await updateUserProfile(id,data)

    console.log(res,'res update thunk');
    
    return res?.data;
})



interface IProfileState {
    profile:IUser,
    isLoading: boolean 
    error: any
}

const initialState:IProfileState = {
    profile:initialUser,
    isLoading: false,
    error: null
} 

const userProfileSlice = createSlice({
    name:'updateProfile',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(updateProfile.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(updateProfile.fulfilled,(state, action)=>{
            state.isLoading= false
            state.profile=action.payload
            state.error=null
        });
        builder.addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading= false
            state.profile= initialUser
            state.error=action.error.message
        })

    }
})

export default userProfileSlice.reducer