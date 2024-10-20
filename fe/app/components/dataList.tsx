import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useFormik } from "formik";

export type ContentRecord = {
	_id?: string;
	data: string;
}

function hasId(obj: ContentRecord): obj is ContentRecord & { _id: string } {
	return obj._id !== undefined;
}

const CardContentInput = (props: {
	id: string,
	text: string,
	handleChange: (e: string | React.ChangeEvent<any>) => void
}) => {
	const { id, text, handleChange } = props;
	return (
		<div className="w-full">
			<Input
				name={`fields.${id}`}
				value={text}
				onChange={handleChange}
				size="lg"
				radius="md"
				color="primary"
			/>
		</div>
	)
}

const CardContent = (props: {
	item: ContentRecord,
	deleteItem: (id: string) => void,
}) => {
	const { item, deleteItem } = props;
	const { _id, data } = item;
	return <>
		<div className="flex flex-row justify-start w-full">{data}</div>
		<div className="flex flex-row justify-end">
			<Button size="sm" color="secondary" onClick={() => _id && deleteItem(_id)}>Delete</Button>
		</div>
	</>
}

const ListItem = (props: {
	item: ContentRecord,
	deleteItem: (id: string) => void,
	handleChange: (e: string | React.ChangeEvent<any>) => void
	editMode?: boolean
}) => {
	const { item, deleteItem, editMode, handleChange } = props;
	const { _id, data } = item;
	return (
		<div key={_id} className="flex gap-4">
			<Card className="w-full">
				<CardBody className="flex flex-row justify-between">
					{
						_id && (editMode ? <CardContentInput id={_id} text={data} handleChange={handleChange} /> : <CardContent item={item} deleteItem={deleteItem} />)
					}
				</CardBody>
			</Card>
		</div>
	)
};

type FormValues = { fields: Record<string, ContentRecord> };

export const DataList = (props: {
	items: ContentRecord[] | null,
	deleteItem: (id: string) => void,
	editItem: (data: ContentRecord) => void,
	onSubmit: () => void
	editMode?: boolean
}) => {
	const { items, deleteItem, editItem, onSubmit, editMode } = props;
	const fields: Record<string, ContentRecord> = {};
	items && items.forEach(item => {
		if (!item._id) return;
		fields[item._id] = item;
	});
	const formik = useFormik<FormValues>({
		initialValues: { fields },
		onSubmit: (data, helpers) => {
			console.log('From Form: ', data);
			items && items.forEach(item => {
				if (!item._id) return;
				const inputData = data.fields[item._id];
				if (!inputData) return;
				if (inputData._id === item._id && inputData.data !== item.data) {
					editItem(inputData);
				}
			});
			onSubmit();
		},
	});
	return (
		<form className="w-full lg:px-64 md:px-24 py-6" onSubmit={formik.handleSubmit}>
			<div className="flex flex-col-reverse gap-4 w-full">
				{
					items && items.map((item) =>
						hasId(item) && <ListItem key={item._id} item={item} deleteItem={deleteItem} editMode={editMode} handleChange={formik.handleChange(`fields.${item._id}.data`)} />)
				}
			</div>
		</form>
	)
}

export default DataList;
