import { Link } from "@tanstack/react-router";
import { NotFoundError } from "../illustrations/NotFound";

export function LeoFreshNotFound() {
	return (
		<div className='grid gap-3 items-center justify-center'>
			<NotFoundError />
			<div className='grid gap-2'>
				<span>Page not found. Please Check the Url or go back</span>
				<Link to='/app'>Go back to Home</Link>
			</div>
		</div>
	);
}
