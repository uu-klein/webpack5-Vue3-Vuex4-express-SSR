import { onServerPrefetch } from 'vue';
import { useQuery as baseQuery } from 'vue-query';

export const useQuery = (key: any, fetcher: any, options?: any) => {
	const result = baseQuery(key, fetcher, {
		staleTime: 1000,
		...options,
	});
	onServerPrefetch(result.suspense);
	return result;
};
