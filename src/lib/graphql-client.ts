import { GraphQLClient } from 'graphql-request';
import { getSession } from 'next-auth/react';

export const getGraphQLClient = async () => {
  const session = await getSession();
  const token = session?.accessToken;

  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/graphql', {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}; 