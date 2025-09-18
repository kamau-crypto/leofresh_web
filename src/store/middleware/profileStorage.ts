import type { ReadProfileEntity } from "@/domain";
import { base64ToBytes, bytesToBase64 } from "@/lib/utils";
import type { Middleware } from "@reduxjs/toolkit";

const PROFILE_STORAGE_KEY = "leofresh_profile";

// Middleware to handle profile storage and retrieval
export const profileStorageMiddleware: Middleware =
	store => next => (action: any) => {
		// Handle actions that update the profile
		if (action.type === "profile/setCustomer") {
			const profile: ReadProfileEntity | null = action.payload;
			const encodedText = new TextEncoder().encode(JSON.stringify(profile));

			// Store in localStorage
			if (profile) {
				localStorage.setItem(PROFILE_STORAGE_KEY, bytesToBase64(encodedText));
			} else {
				localStorage.removeItem(PROFILE_STORAGE_KEY);
			}
		}

		// Handle retrieval action (optional, for loading on app start)
		if (action.type === "profile/loadProfileFromStorage") {
			try {
				const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
				if (storedProfile) {
					const decodedText = new TextDecoder().decode(
						base64ToBytes(storedProfile)
					);
					const profile: ReadProfileEntity = JSON.parse(decodedText);
					// Dispatch setCustomer to update the store
					store.dispatch({ type: "profile/setCustomer", payload: profile });
				}
			} catch (error) {
				console.error("Failed to load profile from localStorage:", error);
				// Optionally clear corrupted data
				localStorage.removeItem(PROFILE_STORAGE_KEY);
			}
		}

		return next(action);
	};
