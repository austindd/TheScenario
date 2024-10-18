import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from '@nextui-org/react';
import FormInputList from './formInputList';
import { ContentRecord } from '@/app/components/dataList';

type FormValues = Omit<ContentRecord, '_id'>;

const DataForm: React.FC = () => {
	const formik = useFormik<FormValues>({
		initialValues: {
			userName: '',
			content: '',
		},
		onSubmit: (values) => {
			console.log(values);
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