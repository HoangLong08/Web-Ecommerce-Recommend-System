import { createAsyncThunk } from '@reduxjs/toolkit';
import uploads from '../../api/uploads';

const uploadMultiImagesAdminAction = createAsyncThunk('uploads/uploadMultiImagesAdminAction', async (params, thunkAPI) => {
	try {
		const res = await uploads.uploadMultipleImagesAdmin(params.formData).then(response => {
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

export { uploadMultiImagesAdminAction }
