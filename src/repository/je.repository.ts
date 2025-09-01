import type { CreateJournalEntryDTO } from "@/data-access/dto";
import type { CreatedJournalEntryModel } from "@/data-access/models/je.model";

export interface JERepository {
	createAndSubmitJournalEntry(
		data: CreateJournalEntryDTO
	): Promise<CreatedJournalEntryModel>;
	cancelJournalEntry(id: string): Promise<void>;
	amendJournalEntry(
		id: string,
		data: CreateJournalEntryDTO
	): Promise<CreatedJournalEntryModel>;
}
