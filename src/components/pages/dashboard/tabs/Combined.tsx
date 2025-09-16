import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Payables } from "./Payables";
import { Receivables } from "./Receivables";

export function ReceivablesPayables() {
	const styles =
		"data-[state=active]:bg-primary/50 data-[state=inactive]:shadow-md data-[state=inactive]:shadow-primary/40 hover:shadow-primary/50 data-[state=inactive]:text-foreground h-10 text-md rounded-2xl data-[state=active]:border-primary px-4 py-2";
	return (
		<Tabs
			defaultValue='receivables'
			className='w-full py-2'>
			<TabsList className='bg-transparent border-b-0 mb-4 gap-2'>
				<TabsTrigger
					value='receivables'
					className={styles}>
					Receivables
				</TabsTrigger>
				<TabsTrigger
					value='payables'
					className={styles}>
					Payables
				</TabsTrigger>
			</TabsList>
			<TabsContent value='receivables'>
				<Receivables />
			</TabsContent>
			<TabsContent value='payables'>
				<Payables />
			</TabsContent>
		</Tabs>
	);
}
