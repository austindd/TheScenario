import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from '@nextui-org/react';
import FormInputList from './formInputList';
import { ContentRecord } from '@/app/components/dataList';

type FormValues = Omit<ContentRecord, '_id'>;

const DataForm = (props: { onSubmit: (values: FormValues) => void }) => {
	const formik = useFormik<FormValues>({
		initialValues: {
			data: '',
		},
		onSubmit: (values) => {
			console.log(values);
			props.onSubmit(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="flex flex-col gap-4">
				<Input
					name="data"
					value={formik.values.data}
					onChange={event => formik.handleChange('data')(event.target.value)}
					label="Data"
					placeholder="exampleUser42"
					size="lg"
					radius="md"
				/>
				{/* <Input
					name="content"
					value={formik.values.content}
					onChange={event => formik.handleChange('content')(event.target.value)}
					label="Content"
					placeholder="ABC xyz"
					size="lg"
					radius="md"
				/> */}
			</div>
			<div className="flex flex-col gap-4">
				<Button radius='md' type="submit" size="lg">Submit</Button>
			</div>
		</form>
	);
};

export default DataForm;