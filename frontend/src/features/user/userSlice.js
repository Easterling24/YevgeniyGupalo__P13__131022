import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin, getUserProfile, updateProfileData } from './userActions';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
	loading: false,
	userInfo: null,
	userToken,
	error: null,
	success: false
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('userToken');
			state.loading = false;
			state.userInfo = null;
			state.userToken = null;
			state.error = null;
		}
	},
	extraReducers: {
		// login user
		[userLogin.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
			state.userToken = payload.body.token;
		},
		[userLogin.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},

		// Register user
		[registerUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},

		// Profile Details
		[getUserProfile.pending]: (state) => {
			state.loading = true;
		},
		[getUserProfile.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload.body;
		},
		[getUserProfile.rejected]: (state, { payload }) => {
			state.loading = false;
		},

		// Updating Data

		[updateProfileData.pending]: (state) => {
			state.loading = true;
		},
		[updateProfileData.fulfilled]: (state, { payload }) => {
			console.log(payload);
			state.loading = false;
			state.userInfo = payload.body;
		},
		[updateProfileData.rejected]: (state, { payload }) => {
			state.loading = false;
		}
	}
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
