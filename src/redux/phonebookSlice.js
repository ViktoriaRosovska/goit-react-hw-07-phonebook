import { createSlice } from '@reduxjs/toolkit';
// import { initialState } from '../constants';
import { nanoid } from 'nanoid';

const phonebookSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(user) {
        return {
          payload: {
            name: user.name,
            number: user.number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(user => user.id === action.payload);
      state.splice(index, 1);
    },

    fetchingInProcess(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addContact,
  deleteContact,
  fetchingInProcess,
  fetchingSuccess,
  fetchingError,
} = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
