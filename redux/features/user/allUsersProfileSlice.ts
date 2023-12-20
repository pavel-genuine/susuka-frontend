import { getAllUserProfileInfo } from "@/api/api";
import { IUser } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchAllUsersProfile = createAsyncThunk("/allUsersProfile/fetchAllUsersProfile",
    async () => {
        const res = await getAllUserProfileInfo()
        console.log(res,'res thunk');
        
        return res?.data;
    })


export interface IUsersState {
    users: IUser[]
    isLoading: boolean
    error: any
}

const initialState:IUsersState = {
    users: [],
    isLoading:false,
    error: null
} 

const allUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllUsersProfile.pending, (state:IUsersState, action) => {
            state.isLoading = false
            state.users = []
            state.error = null
        });
        builder.addCase(fetchAllUsersProfile.fulfilled, (state:IUsersState, action) => {
            state.isLoading = false
            state.users = action.payload
            state.error = null
        });
        builder.addCase(fetchAllUsersProfile.rejected, (state:IUsersState, action) => {
            state.isLoading = false
            state.users = []
            state.error = action.error.message
        })

    }
})

export default allUsersSlice.reducer