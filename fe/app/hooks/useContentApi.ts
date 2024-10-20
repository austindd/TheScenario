import { ContentRecord } from "@/app/types/formTypes";
import { useCallback, useEffect, useMemo, useState } from "react";

const fetchAllContent = async () => {
	const result = await fetch(`http://127.0.01:3000/data`, {
		method: 'GET',
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
	const result = await fetch(`http://127.0.01:3000/data/?id=${id}`, {
		method: 'DELETE',
	});
	return result;
}

const updateContent = async (data: ContentRecord) => {
	const result = await fetch(`http://127.0.01:3000/data`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
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
	}, [loadData, setState, setIsLoading, setError]);

	const fetchData = useCallback(() => {
		setLoadData(true);
	}, [setLoadData])

	const addData = useCallback(async (data: Omit<ContentRecord, '_id'>) => {
		setIsModifyingData(true);
		setLoadData(false);
		addContent(data).then(async res => {
			setIsModifyingData(false);
			fetchData();
		}).catch(error => {
			if (!!error && error instanceof Error) {
				setError(error);
			}
			setIsModifyingData(false);
			fetchData();
		});
	}, [setState, setLoadData, setIsModifyingData, setError]);

	const deleteData = useCallback(async (id: string) => {
		setIsModifyingData(true);
		setLoadData(false);
		deleteContent(id).then(async res => {
			setIsModifyingData(false);
			fetchData();
		}).catch(error => {
			if (!!error && error instanceof Error) {
				setError(error);
			}
			setIsModifyingData(false);
			fetchData();
		});
	}, [setState, setLoadData, setIsModifyingData, setError]);

	const updateData = useCallback(async (data: ContentRecord) => {
		setIsModifyingData(true);
		setLoadData(false);
		updateContent(data).then(async res => {
			setIsModifyingData(false);
			fetchData();
		}).catch(error => {
			if (!!error && error instanceof Error) {
				setError(error);
			}
			setIsModifyingData(false);
			fetchData();
		});
	}, [setState, setLoadData, setIsModifyingData, setError]);

	const result = useMemo(() => ({
		data: state,
		isLoading,
		isModifyingData,
		error,
		fetchData,
		addData,
		deleteData,
		updateData,
	}), [state, isLoading, isModifyingData, error, fetchData, addData, deleteData]);

	return result;
};