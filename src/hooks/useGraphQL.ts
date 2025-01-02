// src/hooks/useGraphQL.ts

import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  fetchGraphQL,
  GraphQLRequest,
  GraphQLResponse,
} from "@/lib/graphqlClient";

interface UseGraphQLParams<TVariables> {
  query: string;
  variables?: TVariables;
  options?: UseQueryOptions<GraphQLResponse<any>, Error>;
}

export function useGraphQL<TData, TVariables>(
  params: UseGraphQLParams<TVariables>,
): UseQueryResult<GraphQLResponse<TData>, Error> {
  const { query, variables, options } = params;

  return useQuery<GraphQLResponse<TData>, Error>({
    queryKey: [query, variables],
    queryFn: () => fetchGraphQL<TData>({ query, variables }),
    ...options,
  });
}
