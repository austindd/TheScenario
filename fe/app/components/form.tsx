import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from '@nextui-org/react';
import FormInputList from './formInputList';
import { ContentRecord } from '@/app/components/dataList';

type FormValues = Omit<ContentRecord, '_id'>;

const DataForm = (props: {onSubmit: (values: FormValues) => void}) => {
	const formik = useFormik<FormValues>({
		initialValues: {
			userName: '',
			content: '',
		},
		onSubmit: (values) => {
			console.log(values);
			props.onSubmit(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="flex flex-col gap-4">
				<FormInputList />
				<Button type="submit" size="lg">Submit</Button>
			</div>
		</form>
	);
};

export default DataForm;