import { getOwnProfileInfo } from '@/api/api';
import { IUser, USER_STATUS } from '@/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOwnProfile = createAsyncThunk(
    '/ownProfile/fetchOwnProfile',
    async () => {
        const res = await getOwnProfileInfo();
        return res?.data;
    }
);

export const initialUser: IUser = {
    id: 0,
    name: '',
    email: '',

    phone: '',
    password: '',
    profilePicture: '',
    oauthId: '',
    oAuthType: ' ',
    twoFA: false,
    country: ' ',

    tag: ' ',
    companyName: ' ',
    website: ' ',
    address: ' ',
    city: ' ',
    state: ' ',
    postalCode: ' ',
    ip: ' ',
    macAddress: ' ',
    //   planId?: number;
    //   plan?: Plan;
    bonusCredit: 0,

    bonusExpiredBy: 0,
    subscription: [],
    subscriptionId: 0,
    verificationToken: '',
};

interface IProfileState {
    profile: IUser;
    isLoading: boolean;
    error: any;
}

const initialState: IProfileState = {
    profile: initialUser,
    isLoading: false,
    error: null,
};

const ownProfileSlice = createSlice({
    name: 'ownProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOwnProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOwnProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.statusCode >= 400) {
                state.profile = initialUser;
                state.error = action.payload;
            } else {
                state.profile = action.payload;
                state.error = null;
            }
        });
        builder.addCase(fetchOwnProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.profile = initialUser;
            state.error = action.error.message;
        });
    },
});

export default ownProfileSlice.reducer;
