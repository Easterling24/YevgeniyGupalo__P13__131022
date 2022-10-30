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
			console.log(data);
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

export const getUserProfile = createAsyncThunk('user/profileDetail', async (bearer, { getState, rejectWithValue }) => {
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

			console.log(config);

			const { data } = await axios.put('api/v1/user/profile', { firstName, lastName }, config);

			console.log(data);

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

//   avenger235
//   testavengers@gmail.com

// export const logUser = createAsyncThunk("auth/logUser", async ({ email, password }, thunkApi) => {
// 	return axios
// 		.post("user/login", { email: email, password: password })
// 		.then((resp) => {
// 			return resp.data;
// 		})
// 		.catch((err) => {
// 			return thunkApi.rejectWithValue(err.response.data);
// 		});
// });

// export const editUserInfo = createAsyncThunk("auth/editUserInfo", async ({ firstName, lastName }, thunkApi) => {
// 	const currentToken = thunkApi.getState().auth.currentToken;
// 	return axios({
// 		method: "put",
// 		url: "user/profile",
// 		data: { firstName: firstName, lastName: lastName },
// 		headers: { Authorization: `Bearer ${currentToken}` },
// 	})
// 		.then((resp) => {
// 			return resp;
// 		})
// 		.catch((err) => {
// 			return thunkApi.rejectWithValue(err.response.data);
// 		});
// });
