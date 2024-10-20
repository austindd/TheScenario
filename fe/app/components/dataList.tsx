import { ContentRecord, hasId } from "@/app/types/formTypes";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useFormik } from "formik";

const CardContentInput = (props: {
	id: string,
	text: string,
	handleChange: (e: string | React.ChangeEvent<any>) => void
}) => {
	const { id, text, handleChange } = props;
	return (
		<div className="w-full">
			<Input
				name={`toEdit[${id}].data`}
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

export const DataList = (props: {
	items: ContentRecord[] | null,
	formData: Record<string, ContentRecord>,
	deleteItem: (id: string) => void,
	// editItem: (data: ContentRecord) => void,
	// onSubmit: () => void
	editMode?: boolean
	handleChange: (field: string) => (e: string | React.ChangeEvent<any>) => void
}) => {
	const { items, formData, deleteItem, editMode, handleChange } = props;
	console.log('DataList: ', items, formData);
	console.log('Form Data: ', formData);
	return (
		<div className="flex flex-col-reverse gap-4 w-full">
			{
				Object.values(formData).map((item) =>
					hasId(item) && <ListItem key={item._id} item={item} deleteItem={deleteItem} editMode={editMode} handleChange={handleChange(`toEdit[${item._id}].data`)} />)
			}
		</div>
	)
}

export default DataList;
