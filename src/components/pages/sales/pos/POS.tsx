import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export function POS() {
	const schema = z.object({
		name: z
			.string()
			.min(2, { message: "Name should be at least 2 characters." }),
		email: z.string().email({ message: "Invalid email address." }),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	function onSubmit(data: z.infer<typeof schema>) {
		toast.custom(
			<pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
				<h2>"You submitted the following values"</h2>
				<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
			</pre>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-2/3 space-y-6'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='shadcn'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='shadcn'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your public display email.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
