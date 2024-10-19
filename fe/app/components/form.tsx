import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from '@nextui-org/react';
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
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<Input
						name="data"
						value={formik.values.data}
						onChange={event => formik.handleChange('data')(event.target.value)}
						label="Data"
						placeholder="exampleUser42"
						size="lg"
						radius="md"
						color="primary"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<Button
						radius='md'
						type="submit"
						size="lg"
						color="secondary"
					>
						Submit
					</Button>
				</div>
			</div>
		</form>
	);
};

export default DataForm;