export type ContentRecord = {
	_id?: string;
	data: string;
}

export const DataList = (props: { items: ContentRecord[] }) => {
	return (
		<div className="flex flex-col">
			{props.items.map((item, index) => {
				const { _id, data } = item;
				return (<div key={_id} className="flex flex-row gap-4">
					<div>{data}</div>
				</div>)
			})}
		</div>
	)
}

export default DataList;
