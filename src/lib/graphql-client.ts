import "server-only";

const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://localhost:8080/graphql";

export async function gqlFetch<T = any>(
  query: string,
  variables?: Record<string, any>,
  headers?: HeadersInit
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