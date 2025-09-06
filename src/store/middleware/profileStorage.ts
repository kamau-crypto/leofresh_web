import type { ReadProfileEntity } from "@/domain";
import type { Middleware } from "@reduxjs/toolkit";

const PROFILE_STORAGE_KEY = "leofresh_profile";

// Middleware to handle profile storage and retrieval
export const profileStorageMiddleware: Middleware = store => next => (action: any) => {
	// Handle actions that update the profile
	if (action.type === "profile/setCustomer") {
		const profile: ReadProfileEntity | null = action.payload;

		// Store in sessionStorage
		if (profile) {
			sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
		} else {
			sessionStorage.removeItem(PROFILE_STORAGE_KEY);
		}
	}

	// Handle retrieval action (optional, for loading on app start)
	if (action.type === "profile/loadProfileFromStorage") {
		try {
			const storedProfile = sessionStorage.getItem(PROFILE_STORAGE_KEY);
			if (storedProfile) {
				const profile: ReadProfileEntity = JSON.parse(storedProfile);
				// Dispatch setCustomer to update the store
				store.dispatch({ type: "profile/setCustomer", payload: profile });
			}
		} catch (error) {
			console.error("Failed to load profile from sessionStorage:", error);
			// Optionally clear corrupted data
			sessionStorage.removeItem(PROFILE_STORAGE_KEY);
		}
	}

	return next(action);
};
