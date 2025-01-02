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

export function useGraphQL<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: UseQueryOptions<GraphQLResponse<TData>, Error>,
): UseQueryResult<GraphQLResponse<TData>, Error> {
  return useQuery<GraphQLResponse<TData>, Error>(
    [query, variables],
    () => fetchGraphQL<TData>({ query, variables }),
    options,
  );
}
