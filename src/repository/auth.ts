import type { LoggedInUserEntity, Login, LoginResponseEntity } from "@/domain";
import { appConfig } from "@/lib/config";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { AxiosResponse } from "axios";
import axios from "axios";

export interface IAuthRepository {
	login: (credentials: Login) => Promise<LoggedInUserEntity>;
}

export class AuthRepository implements IAuthRepository {
	constructor() {}

	async login({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<LoggedInUserEntity> {
		const response: AxiosResponse<LoginResponseEntity> = await axios.post(
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
	}
}

// This is our data-fetching hook. It's only concerned with making the API call.
