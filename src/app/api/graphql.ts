import { getGraphQLClient } from '@/lib/graphql-client';

export async function executeGraphQL(query: string, variables = {}) {
  try {
    const client = await getGraphQLClient();
    return await client.request(query, variables);
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
} 