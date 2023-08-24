import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as services from '../services/notify';
axios.defaults.baseURL = 'https://64de41ff825d19d9bfb25dcc.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      services.Notify.success(`Your contacts were loaded`);
      return response.data;
    } catch (error) {
      services.Notify.failure(
        'Sorry. We have some problem with a server. Please, reload the page'
      );
      return thunkAPI.rejectWithValue(error.messahe);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (text, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', text);
      services.Notify.success(
        `Contact ${text.name} was added to the phonebook`
      );
      return response.data;
    } catch (error) {
      services.Notify.failure(
        'Sorry. We have some problem with a server. Please, reload the page'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      services.Notify.failure(
        'Sorry. We have some problem with a server. Please, reload the page'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (user, thunkAPI) => {
    try {
      const response = await axios.put(`/contacts/${user.id}`, user);
      services.Notify.success(`Contact ${user.name} was saved`);
      return response.data;
    } catch (error) {
      services.Notify.failure(
        'Sorry. We have some problem with a server. Please, reload the page'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
