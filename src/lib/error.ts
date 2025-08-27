import toast from "react-hot-toast";

export class LeofreshError {
	constructor({ message }: { message: string }) {
		this.renderToast({ message });
	}

	renderToast({ message }: { message: string }) {
		return toast.error(message, { duration: 5000, position: "bottom-right" });
	}
}
