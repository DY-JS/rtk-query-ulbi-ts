import axios from 'axios';
import { AppDispatch } from './../app/store';
import { IUser } from '../types/IUser';
import { userSlice } from './user/UserSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   const { usersFetching, usersFetchingError, usersFetchingSuccess } =
//     userSlice.actions;
//   try {
//     dispatch(usersFetching());
//     const response = await axios.get<IUser[]>(
//       'https://jsonplaceholder.typicode.com/users'
//     );
//     dispatch(usersFetchingSuccess(response.data));
//   } catch (e: any) {
//     dispatch(usersFetchingError(e.message));
//   }
// };

//С помощью createAsyncThunk, который передаётся в extraReducers
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
