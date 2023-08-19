import { configureStore } from '@reduxjs/toolkit';
import { phonebookReducer } from './phonebookSlice';
import { sortReducer } from './sortSlice';

import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
});
