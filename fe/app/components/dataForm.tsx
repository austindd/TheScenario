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
		onSubmit: (values, helpers) => {
			console.log(values);
			props.onSubmit(values);
			helpers.resetForm();
		},
	});

	return (
		<form className="w-full lg:px-64 md:px-24 pb-6" onSubmit={formik.handleSubmit}>
			<div className="w-full flex flex-col gap-8">
				<div className="w-full">
					<Input
						name="data"
						value={formik.values.data}
						onChange={event => formik.handleChange('data')(event.target.value)}
						label="Write something"
						size="lg"
						radius="md"
						color="primary"
					/>
				</div>
				<div className="flex justify-center w-full">
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