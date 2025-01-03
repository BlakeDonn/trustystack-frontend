// src/lib/graphqlClient.ts

export interface GraphQLRequest<TVariables = undefined> {
  query: string;
  variables?: TVariables;
}

export interface GraphQLResponse<TData> {
  data?: TData;
  errors?: { message: string }[];
}

export async function fetchGraphQL<TData, TVariables = undefined>({
  query,
  variables,
}: GraphQLRequest<TVariables>): Promise<GraphQLResponse<TData>> {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ query, variables }),
  });

  const result: GraphQLResponse<TData> = await response.json();
  return result;
}
