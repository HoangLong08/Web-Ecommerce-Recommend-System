import { createAsyncThunk } from '@reduxjs/toolkit';
import brands from '../../api/brands';

const getAllBrandAdminAction = createAsyncThunk('brand/getAllBrandAdminAction', async (params, thunkAPI) => {
	try {
		const { idCategory, nameBrand = "" } = params;
		const res = await brands.getAllBrandAdmin(idCategory, nameBrand).then(response => {
			if (response) {
				return response;
			}
			return [];
		});
		return res;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export { getAllBrandAdminAction }