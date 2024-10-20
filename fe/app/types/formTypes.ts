export type ContentRecord = {
	_id?: string;
	data: string;
}

export function hasId(record: ContentRecord): record is Required<ContentRecord> {
	return !!record._id;
}

export type FormValues = {
	toAdd: Omit<ContentRecord, '_id'>;
	toEdit: Record<string, ContentRecord>;
}
