// src/lib/graphqlClient.ts

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T>(
  request: GraphQLRequest,
): Promise<GraphQLResponse<T>> {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include credentials if your GraphQL endpoint requires authentication via cookies
      // "Authorization": `Bearer ${yourToken}`, // Uncomment and set if using headers for auth
    },
    body: JSON.stringify(request),
    credentials: "include", // Ensures cookies are included
  });

  const json: GraphQLResponse<T> = await res.json();

  if (!res.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Failed to fetch GraphQL endpoint",
    );
  }

  if (json.errors && json.errors.length > 0) {
    // Optionally, handle specific GraphQL errors here
    throw new Error(json.errors[0].message);
  }

  return json;
}

const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://localhost:8080/graphql";

export async function gqlFetch<T = any>(
  query: string,
  variables?: Record<string, any>,
  headers?: HeadersInit,
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
