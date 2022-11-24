import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
	'user/signup',
	async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			const { data } = await axios.post('api/v1/user/signup', { email, password, firstName, lastName }, config);
			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const userLogin = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
	try {
		// configure header's Content-Type as JSON
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const { data } = await axios.post('api/v1/user/login', { email, password }, config);
		// store user's token in local storage
		localStorage.setItem('userToken', data.body.token);

		return data;
	} catch (error) {
		// return custom error message from API if any
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const getUserProfile = createAsyncThunk('user/profileDetail', async ({ getState, rejectWithValue }) => {
	try {
		const { user } = getState();
		const bodyParameters = {
			key: 'value'
		};

		const config = {
			headers: {
				Authorization: `Bearer ${user.userToken}`
			}
		};
		const { data } = await axios.post('api/v1/user/profile', bodyParameters, config);
		return data;
	} catch (error) {
		// return custom error message from API if any
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const updateProfileData = createAsyncThunk(
	'user/profile-update',
	async ({ firstName, lastName }, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.userToken}`
				}
			};

			const { data } = await axios.put('api/v1/user/profile', { firstName, lastName }, config);

			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
