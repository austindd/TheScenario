import { ContentRecord } from "@/app/components/dataList";
import { useCallback, useEffect, useState } from "react";
// import { v4 as uuidv4 } from 'uuid';

const fetchAllContent = async () => {
	const result = await fetch(`http://127.0.01:3000/data`, {
		method: 'GET',
		mode: 'no-cors',
	});
	return result;
};

const addContent = async (data: Omit<ContentRecord, '_id'>) => {
	const result = await fetch(`http://127.0.01:3000/data`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return result;
};

const deleteContent = async (id: string) => {
	const result = await fetch(`http://127.0.01:3000/data/${id}`, {
		method: 'DELETE',
	});
	return result;
}

export const useContentApi = () => {
	const [state, setState] = useState<ContentRecord[] | null>(null);
	const [loadData, setLoadData] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isModifyingData, setIsModifyingData] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!loadData) return;
		setLoadData(false);
		setIsLoading(true);
		setError(null);

		fetchAllContent().then(async res => {
			try {
				const data = await res.json() as ContentRecord[];
				setState(data);
				console.log(data);
			} catch (error) {
				if (!!error && error instanceof Error) {
					setError(error);
				}
			}
			setIsLoading(false);
		}).catch(error => {
			if (!!error && error instanceof Error) {
				setError(error);
			}
			setIsLoading(false);
		});
	});

	const fetchData = useCallback(() => {
		setLoadData(true);
	}, [setLoadData])

	const addData = useCallback(async (data: Omit<ContentRecord, '_id'>) => {
		setIsModifyingData(true);
		addContent(data).then(async res => {
			try {
				if (res.ok) {
					const result = await res.json() as ContentRecord;
					console.log("Content added: ", result);
				}
			} catch (error) {
				if (!!error && error instanceof Error) {
					setError(error);
				}
			}
			setIsModifyingData(false);
			setLoadData(true);
		}).catch(error => {
			if (!!error && error instanceof Error) {
				setError(error);
			}
			setIsModifyingData(false);
		});
	}, [setState, setLoadData, setIsModifyingData, setError]);

	const deleteData = useCallback(async (id: string) => {
		setIsModifyingData(true);
		deleteContent(id).then(async res => {
			try {
				if (res.ok) {
					console.log("Content deleted: ", id);
				}
			} catch (error) {
				if (!!error && error instanceof Error) {
					setError(error);
				}
			}
			setIsModifyingData(false);
			setLoadData(true);
		}).catch(error => {
			if (!!error && error instanceof Error) {
				setError(error);
			}
			setIsModifyingData(false);
		});
	}, [setState, setLoadData, setIsModifyingData, setError]);

	return {
		data: state,
		isLoading,
		isModifyingData,
		error,
		fetchData,
		addData,
		deleteData,
	};
};