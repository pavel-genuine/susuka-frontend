import { signIn } from '@/api/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSignIn = createAsyncThunk(
    '/signIn/getSignIn',
    async (data: any) => {
        const res = await signIn(data);
        return res?.data;
    }
);

interface ISignInState {
    signIn: { message: string; user: any };
    isLoading: boolean;
    error: any;
}

const initialState: ISignInState = {
    signIn: { message: '', user: {} },
    isLoading: false,
    error: null,
};

const signInSlice = createSlice({
    name: 'singlesignInDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state: ISignInState) => {
            state.isLoading = true;
        });
        builder.addCase(
            fetchSignIn.fulfilled,
            (state: ISignInState, action) => {
                state.isLoading = false;
                state.signIn = action.payload;
                state.error = null;
            }
        );
        builder.addCase(fetchSignIn.rejected, (state: ISignInState, action) => {
            state.isLoading = false;
            state.signIn = { message: '', user: {} };
            state.error = action.error.message;
        });
    },
});

export default signInSlice.reducer;
