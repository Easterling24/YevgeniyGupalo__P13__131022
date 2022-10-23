import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
	'user/signup',
	async ({ firstName, email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			await axios.post('/user/signup', { firstName, email, password }, config);
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

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
		localStorage.setItem('userToken', data.userToken);

		console.log(data);
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

export const getUserProfile = createAsyncThunk('user/profileDetails', async (arg, { getState, rejectWithValue }) => {
	try {
		const { user } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		};

		const { data } = await axios.get('api/v1/user/profile', config);
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

//   avenger235
//   testavengers@gmail.com
