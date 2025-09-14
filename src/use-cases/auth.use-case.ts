import type { LoggedInUserEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { AuthRepository } from "@/repository";

// export const useLoginUseCase = () => {
// 	const { login, isLoading } = useLoginService();

// 	const loginUser = async (credentials: Login): Promise<LoggedInUser> => {
// 		try {
// 			const user: LoggedInUser = await login({ credentials });

// 			return { ...user };
// 		} catch (error) {
// 			throw new LeofreshError({ message: (error as Error).message });
// 		}
// 	};

// 	return { loginUser, isLoading };
// };

export class AuthUseCase {
	private requiredCookies: string[];
	private authRepo: AuthRepository;
	constructor({ authRepo }: { authRepo: AuthRepository }) {
		this.requiredCookies = ["full_name", "user_id", "system_user", "user_lang"];
		this.authRepo = authRepo;
	}

	async login({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<Pick<LoggedInUserEntity, "user">> {
		try {
			const { success, user } = await this.authRepo.login({
				username,
				password,
			});
			if (success !== 0 || !user) {
				throw new LeofreshError({
					message: "Authentication failed: Please try again",
				});
			}
			return { user };
		} catch (error) {
			throw new LeofreshError({ message: (error as Error).message });
		}
	}

	// Bring the login login here

	private extractCookies(ids: string[]): Record<string, string | null> {
		// Check if we're in a browser environment
		if (typeof document === "undefined") {
			return ids.reduce((acc, id) => ({ ...acc, [id]: null }), {});
		}

		// Check if document.cookie exists and is not empty
		if (!document.cookie || document.cookie.trim() === "") {
			return ids.reduce((acc, id) => ({ ...acc, [id]: null }), {});
		}

		try {
			const result: Record<string, string | null> = {};

			// Initialize all requested cookies as null
			ids.forEach(id => {
				result[id] = null;
			});

			const cookies = document.cookie.split(";");

			for (const cookie of cookies) {
				const [name, value] = cookie.trim().split("=");

				// Check if this cookie is one we're looking for
				if (name && ids.includes(name) && value !== undefined) {
					result[name] = decodeURIComponent(value);
				}
			}

			return result;
		} catch (error) {
			console.error("Error extracting cookies:", error);
			return ids.reduce((acc, id) => ({ ...acc, [id]: null }), {});
		}
	}

	isAuthenticated(): boolean {
		const cookies = this.extractCookies(this.requiredCookies);

		const cookieSid = this.extractCookies(["sid", "full_name"]);

		if (
			cookieSid.sid?.toLowerCase() === "guest" ||
			cookieSid.full_name?.toLowerCase() === "guest"
		) {
			return false;
		}

		console.log("cookies found", cookies);

		return this.requiredCookies.every(cookieName => {
			const value = cookies[cookieName];
			return value !== null && value !== "" && value !== "undefined";
		});
	}

	public getUserFromCookies(): {
		systemUser: string;
		fullName: string;
		userId: string;
		userLang: string;
	} | null {
		const cookies = this.extractCookies(this.requiredCookies);

		if (!this.isAuthenticated()) {
			return null;
		}

		return {
			systemUser: cookies.system_user!,
			fullName: cookies.full_name!,
			userId: cookies.user_id!,
			userLang: cookies.user_lang!,
		};
	}
}
