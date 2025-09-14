// the credentials a user provides to login
export interface Login {
	username: string;
	password: string;
}
export interface LoginResponseEntity {
	message: LoggedInUserResponseEntity;
	home_page: string;
	full_name: string;
}

export interface RefreshTokenResponse {
	success_key: number;
	api_key: string;
	api_secret: string;
	username: string;
	email: string;
	roles: Record<string, string>;
	role_profiles: RoleProfile[];
	enabled: number;
	message?: string;
}
export interface LoggedInUserResponseEntity {
	success_key: number;
	message: string;
	sid: string;
	api_key: string;
	api_secret: string;
	username: string;
	email: string;
	enabled: number;
	role_profiles: RoleProfile[];
	roles: UserRoles[];
}

export interface LoggedInUserEntity {
	success: number;
	message: string;
	user: Pick<
		LoggedInUserResponseEntity,
		"username" | "email" | "roles" | "role_profiles"
	> & {
		full_name: string;
	};
}

export interface RefreshUserTokenEntity
	extends Pick<LoggedInUserEntity, "message" | "success"> {
	user: Pick<
		LoggedInUserResponseEntity,
		"username" | "email" | "roles" | "role_profiles"
	>;
}

export interface RoleProfile {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	role_profile: string;
	parent: string;
	parentfield: string;
	parenttype: string;
	doctype: string;
}

export interface UserRoles {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	role: string;
	parent: string;
	parentfield: string;
	parenttype: string;
	doctype: string;
}
