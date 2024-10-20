import React, { ChangeEvent } from 'react';
import { Input, Button } from '@nextui-org/react';
import { ContentRecord } from '@/app/types/formTypes';

const AddDataInput = (props: {
	content: ContentRecord,
	onClickEditButton: () => void
	handleChange: (field: string) => (e: string | ChangeEvent<any>) => void
	editMode: boolean
}) => {
	const { content, handleChange, onClickEditButton, editMode } = props;

	return (
		<div className="w-full flex flex-col gap-8 pb-8">
			<div className="w-full">
				<Input
					name="toAdd.data"
					value={content.data}
					onChange={handleChange('toAdd.data')}
					label="Write something"
					size="lg"
					radius="md"
					color="primary"
				/>
			</div>
			<div className="flex justify-center w-full gap-4">
				<Button
					radius='md'
					type="submit"
					size="lg"
					color="secondary"
				>{!editMode ? "Submit" : "Submit Edits"}</Button>
				{!editMode && <Button
					radius='md'
					onClick={onClickEditButton}
					size="lg"
					color="secondary"
				>Edit</Button>
				}
			</div>
		</div>
	);
};

export default AddDataInput;