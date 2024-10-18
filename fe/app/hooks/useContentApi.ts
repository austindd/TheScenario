import { ContentRecord } from "@/app/components/dataList";
import { useCallback, useEffect, useState } from "react";

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
		mode: 'no-cors',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return result;
};

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
				const isOk = res.ok && await res.json();
				if (isOk === true) {
					console.log("Content added: ", data);
					return true;
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
	};
};