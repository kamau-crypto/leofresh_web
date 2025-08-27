import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Login } from "@/domain";
import { useLoginForm } from "@/hooks/loginForm";
import { companyName } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Loader2Icon, Lock, LogIn, Mail } from "lucide-react";
import { LeofreshFormField } from "./leofresh";
import { Form } from "./ui/form";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { form, onSubmit } = useLoginForm();
	return (
		<div
			className={cn("flex flex-col gap-6 w-full", className)}
			{...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<Form {...form}>
						<form
							className='p-6 md:p-8'
							onSubmit={form.handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-6'>
								<div className='flex flex-col items-center text-center'>
									<h1 className='text-2xl font-bold'>Welcome back</h1>
									<p className='text-muted-foreground text-balance'>
										Login to your {companyName} account
									</p>
								</div>
								<div className='grid gap-3'>
									<LeofreshFormField<Login>
										error={form.formState.errors.username}
										left={<Mail className='w-4 h-4 mr-3' />}
										control={form.control}
										name={"username"}
										placeholder='Email'
										labelText='Email or UserName'
										type='text'
									/>
								</div>
								<div className='grid gap-3'>
									<div className='flex flex-col'>
										<LeofreshFormField<Login>
											error={form.formState.errors.password}
											left={<Lock className='w-4 h-4 mr-2' />}
											control={form.control}
											name={"password"}
											placeholder='password'
											labelText='Password'
											type='password'
										/>
										<a
											href='/forgot-password'
											className='ml-auto text-sm underline-offset-2 hover:underline'>
											Forgot your password?
										</a>
									</div>
								</div>
								<Button
									type='submit'
									className='w-full'>
									{form.formState.isSubmitting ? (
										<Loader2Icon className='animate-spin' />
									) : (
										<LogIn />
									)}
									Login
								</Button>
							</div>
						</form>
					</Form>
					<div className='bg-muted relative hidden md:block'>
						<img
							src='/logo.png'
							alt='leofresh logo'
							className='absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale'
						/>
					</div>
				</CardContent>
			</Card>
			<div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
				By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
				and <a href='#'>Privacy Policy</a>.
			</div>
		</div>
	);
}
