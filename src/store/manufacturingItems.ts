import type { MaterialsForProductionEntity } from "@/domain";
import { createSlice } from "@reduxjs/toolkit";

const initialProfileState: {
	manufacturingItems: MaterialsForProductionEntity[] | null;
} = {
	manufacturingItems: null,
};

const manufacturingItems = createSlice({
	name: "manufacturingItems",
	initialState: initialProfileState,
	reducers: {
		setManufacturingItems: (state, action) => {
			state.manufacturingItems = action.payload;
		},
		clearManufacturingItems: state => {
			state.manufacturingItems = null;
		},
	},
});

export const { setManufacturingItems } = manufacturingItems.actions;

export default manufacturingItems.reducer;
