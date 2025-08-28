// the credentials a user provides to login
export interface Login {
	username: string;
	password: string;
}
export interface LoginResponse {
	message: UserLogged;
	home_page: string;
	full_name: string;
}

export interface UserLogged {
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
