import { getAllPlans } from "@/api/api";
import { IPlan } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllPlans = createAsyncThunk(
  "/allPlans/fetchAllPlans",
  async () => {
    const res = await getAllPlans();

    return res?.data as any;
  }
);

interface IplansState {
  plans: IPlan[];
  isLoading: boolean;
  error: any;
}

const initialState: IplansState = {
  plans: [],
  isLoading: false,
  error: null,
};

const allPlansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlans.pending, (state: IplansState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPlans.fulfilled, (state: IplansState, action) => {
      state.isLoading = false;
      state.plans = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllPlans.rejected, (state: IplansState, action) => {
      state.isLoading = false;
      state.plans = [];
      state.error = action.error.message;
    });
  },
});

export default allPlansSlice.reducer;
