import * as React from "react";

import type { Login } from "@/domain";
import { sleep } from "@/lib/utils";
import type { LoggedInUser } from "@/use-cases/loginUseCase";
import { useLoginUseCase } from "@/use-cases/loginUseCase";

import { useCallback } from "react";
import toast from "react-hot-toast";

export interface AuthContext {
	isAuthenticated: boolean;
	login: ({ username, password }: Login) => Promise<{ email: string }>;
	api_token: string | null;
	logout: () => Promise<void>;
	user: Pick<LoggedInUser, "user"> | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "leo_token";

function getStoredToken() {
	return sessionStorage.getItem(key);
}

function setStoredToken(user: string | null) {
	if (user) {
		sessionStorage.setItem(key, user);
	} else {
		sessionStorage.removeItem(key);
	}
}

function removeStoredToken(key: string) {
	sessionStorage.removeItem(key);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [api_token, setToken] = React.useState<string | null>(getStoredToken());
	const [user, setUser] = React.useState<Pick<LoggedInUser, "user"> | null>(
		null
	);
	const [isAuthenticated, setisAuthenticated] = React.useState<boolean>(false);

	const { loginUser } = useLoginUseCase();

	const logout = React.useCallback(async () => {
		await sleep(250);

		setStoredToken(null);
		setToken(null);
		removeStoredToken(key);
		setUser(null);
	}, []);

	const login = useCallback(async ({ username, password }: Login) => {
		const {
			message,
			user: { email, role_profiles, roles, username: name },
		} = await loginUser({ username, password });
		toast.success("Login successful");
		setStoredToken(message);

		if (message && roles) {
			setisAuthenticated(prev => !prev);
		}
		setToken(message);
		setUser({ user: { email, role_profiles, roles, username: name } });
		return { email };
	}, []);

	React.useEffect(() => {
		setToken(getStoredToken());
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, login, logout, api_token }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
