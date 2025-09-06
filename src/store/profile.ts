import type { ReadProfileEntity } from "@/domain";
import { createSlice } from "@reduxjs/toolkit";

const initialProfileState: { profile: ReadProfileEntity | null } = {
	profile: null,
};

const profileSlice = createSlice({
	name: "profile",
	initialState: initialProfileState,
	reducers: {
		setCustomer: (state, action) => {
			state.profile = action.payload;
		},
		resetProfile: (state, action) => {
			state.profile = null;
			state.profile = action.payload;
		},
		clearProfile: state => {
			state.profile = null;
		},
		loadProfileFromStorage: (state, action) => {
			state.profile = action.payload;
		},
	},
});

export const { setCustomer, loadProfileFromStorage } = profileSlice.actions;

export default profileSlice.reducer;
