import type { CreateCustomerFormValues } from "./schema";

export function CustomerForm() {
	// Get the list of all customer groups.
	// const {}=

	const defaultValues: CreateCustomerFormValues = {
		customer_name: "",
		customer_type: "Individual",
		customer_group: "",
		territory: "",
		customer_code: "",
	};
    //
	//Add the customer form.
	return <div>Customer Form</div>;
}
