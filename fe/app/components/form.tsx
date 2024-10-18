import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from '@nextui-org/react';
import FormInputList from './formInputList';
import { ContentRecord } from '@/app/components/dataList';

type FormValues = Omit<ContentRecord, '_id'>;

const CustomForm: React.FC = () => {
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
			<FormInputList />
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default CustomForm;