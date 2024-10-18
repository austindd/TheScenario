type ContentRecord = {
	_id: string;
	userName: string;
	content: string;
}

export const DataList = (props: { items: ContentRecord[] }) => {
	return (
		<div className="flex flex-col">
			{props.items.map((item, index) => {
				const { _id, userName, content } = item;
				return (<div key={_id} className="flex flex-row">
					<div>{_id}</div>
					<div>{userName}</div>
					<div>{content}</div>
				</div>)
			})}
		</div>
	)
}

export default DataList;
