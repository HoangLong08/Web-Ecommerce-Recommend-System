

import { createSlice } from '@reduxjs/toolkit';
import {
	getAllBrandAdminAction,
} from './brands.action';

const brandSlice = createSlice({
	name: 'brand',
	initialState: {
		listBrandAdmin: {
			data: [],
			load: false,
			error: ''
		},
	},
	reducers: {
		setListBrandAdmin: (state, action) => {
			state.listBrandAdmin.data = action.payload;
		},
	},

	extraReducers: {
		[getAllBrandAdminAction.pending]: state => {
			state.listBrandAdmin.load = true;
			state.listBrandAdmin.data = [];
			state.listBrandAdmin.error = '';
		},
		[getAllBrandAdminAction.fulfilled]: (state, action) => {
			state.listBrandAdmin.load = false;
			state.listBrandAdmin.data = action.payload;
			state.listBrandAdmin.error = '';
		},
		[getAllBrandAdminAction.rejected]: (state, action) => {
			state.listBrandAdmin.load = false;
			state.listBrandAdmin.error = action.payload.error;
			state.listBrandAdmin.data = [];
		},
	}
});

export const { setListBrandAdmin } = brandSlice.actions;

export default brandSlice.reducer;