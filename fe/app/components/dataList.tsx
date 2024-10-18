
type ContentRecord = {
	id: string;
	userName: string;
	content: string;
}

export const DataList = (props: { items: ContentRecord[] }) => {
	return (
		<div className="flex flex-col">
			{props.items.map((item, index) => {
				const { id, userName, content } = item;
				return (<div key={id} className="flex flex-row">
					<div>{id}</div>
					<div>{userName}</div>
					<div>{content}</div>
				</div>)
			})}
		</div>
	)
}

export default DataList;
