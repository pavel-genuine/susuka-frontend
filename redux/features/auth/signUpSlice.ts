import { signUp } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchSignUp =createAsyncThunk("/signUp/getsignUp",
async(data:{name:string,email:string,password:string})=>{
    const res = await signUp(data)
    console.log(res,'res thunk');
    
    return res?.data;
})



interface ISignUpState {
    signUp:{message:string,user:any},
    isLoading: boolean 
    error: any
}

const initialState:ISignUpState = {
    signUp: {message:'',user:{}},
    isLoading: false,
    error: null
} 

const signUpSlice = createSlice({
    name:'singlesignUpDetail',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{

        builder.addCase(fetchSignUp.pending,(state:ISignUpState)=>{
            state.isLoading= true
        });
        builder.addCase(fetchSignUp.fulfilled,(state:ISignUpState, action)=>{
            state.isLoading= false
            state.signUp=action.payload
            state.error=null
        });
        builder.addCase(fetchSignUp.rejected,(state:ISignUpState,action)=>{
            state.isLoading= false
            state.signUp=  {message:'',user:{}},
            state.error=action.error.message
        })

    }
})

export default signUpSlice.reducer