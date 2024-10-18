import { ContentRecord } from "@/app/components/dataList";
import { useCallback, useEffect, useState } from "react";

const fetchAllContent = async () => {
	const result = await fetch(`http://127.0.01:3000/data`, {
		method: 'GET',
		mode: 'no-cors',
	});
	return result;
};

export const useContentApi = () => {
	const [state, setState] = useState<ContentRecord[] | null>(null);
	const [loadData, setLoadData] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
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
		});
	});

	const updateData = useCallback(() => {
		setLoadData(true);
	}, [setLoadData])

	return {
		data: state,
		isLoading,
		error,
		updateData,
	};
};