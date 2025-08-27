import type { LoginResponse } from "@/domain";
import { appConfig } from "@/lib/config";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { AUTHMUTATIONKEY } from "./keys";

const userLogin = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}) => {
	const response: AxiosResponse<LoginResponse> = await axios.post(
		appConfig.LOGIN_URL,
		{
			usr: username,
			pwd: password,
		}
	);
	if (response.data.message.success_key === 1) {
		return {
			success: 0,
			message: `${response.data.message.api_key}:${response.data.message.api_secret}`,
			user: {
				full_name: response.data.full_name,
				username: response.data.message.username,
				email: response.data.message.email,
				role_profiles: response.data.message.role_profiles,
				roles: response.data.message.roles,
			},
		};
	} else {
		const msg = extractFrappeErrorMessage(response.data.message.message);
		throw new LeofreshError({ message: msg });
	}
};

// This is our data-fetching hook. It's only concerned with making the API call.
export const useLoginMutation = () => {
	return useMutation({
		mutationFn: userLogin,
		mutationKey: AUTHMUTATIONKEY.LOGIN_USER,
	});
};
