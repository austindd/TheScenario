import { Button, Card, CardBody } from "@nextui-org/react";

export type ContentRecord = {
	_id?: string;
	data: string;
}

const ListItem = (props: { item: ContentRecord, deleteItem: (id: string) =>  void }) => {
	const { item, deleteItem } = props;
	const { _id, data } = item;
	return (
		<div key={_id} className="flex gap-4">
			<Card className="w-full">
				<CardBody className="flex flex-row justify-between">
					<div className="flex flex-row justify-start w-full">
						{data}
					</div>
					<div className="flex flex-row justify-end">
						<Button size="sm" color="secondary" onClick={() => _id && deleteItem(_id)}>Delete</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	)
};

export const DataList = (props: { items: ContentRecord[] | null, deleteItem: (id: string) =>  void }) => {
	const { items, deleteItem } = props;
	return (
		<div className="flex flex-col-reverse gap-4 w-full lg:px-64 md:px-24 py-6">
			{items && items.map((item) => <ListItem key={item._id} item={item} deleteItem={deleteItem} />)}
		</div>
	)
}

export default DataList;
