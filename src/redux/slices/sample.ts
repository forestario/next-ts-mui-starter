import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ISampleState } from '@/redux/types/sample';

const initialState: ISampleState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const { startLoading, hasError } = slice.actions;
