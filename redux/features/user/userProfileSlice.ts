import { getUserProfileInfo } from "@/api/api";
import { IUser } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialUser } from "./ownProfileSlice";


export const fetchUserProfile =createAsyncThunk("/userProfile/fetctUserProfile",
async(id:any)=>{
    const res = await getUserProfileInfo(id)
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
    name:'UserProfile',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(fetchUserProfile.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchUserProfile.fulfilled,(state, action)=>{
            state.isLoading= false
            state.profile=action.payload
            state.error=null
        });
        builder.addCase(fetchUserProfile.rejected,(state,action)=>{
            state.isLoading= false
            state.profile= initialUser
            state.error=action.error.message
        })

    }
})

export default userProfileSlice.reducer