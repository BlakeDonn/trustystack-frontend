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
}: {
  query: string;
  variables?: TVariables;
}): Promise<GraphQLResponse<TData>> {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("GraphQL response not OK:", text);
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  let result: GraphQLResponse<TData>;
  try {
    result = await response.json();
  } catch (error) {
    const text = await response.text();
    console.error("Failed to parse JSON:", text);
    throw new Error("Failed to parse JSON response from GraphQL endpoint.");
  }
  return result;
}
