import axios from 'axios';
import {
  fetchingInProcess,
  fetchingSuccess,
  fetchingError,
} from './phonebookSlice';

axios.defaults.baseURL = 'https://64de41ff825d19d9bfb25dcc.mockapi.io';

export const fetchContacts = () => async dispatch => {
  try {
    dispatch(fetchingInProcess());
    const response = await axios.get('/contacts');
    dispatch(fetchingSuccess(response.data));
  } catch (error) {
    dispatch(fetchingError(error.message));
  }
};
