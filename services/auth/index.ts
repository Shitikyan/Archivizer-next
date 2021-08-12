import { useQuery, UseQueryOptions } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

const API_URL = process.env.API_URL || '';

interface QueryParams {
  queryOptions?: UseQueryOptions<any, unknown, any, string[]>;
}

interface LoginQuery extends QueryParams {
  email: string;
  password: string;
}

interface SignUpQuery extends QueryParams {
  fullName: string;
  email: string;
  password: string;
}

const graphQLClient = new GraphQLClient(API_URL, {});

export function login({ email, password, queryOptions }: LoginQuery) {
  return useQuery(
    ['login', email, password],
    async () => {
      const login = await graphQLClient.request(
        gql`
          mutation LoginUser($email: String!, $password: String!) {
            loginUser(input: { email: $email, password: $password }) {
              status
              recordUuid
              record {
                id
                uuid
                fullName
                createdAt
                updatedAt
                deletedAt
              }
              errors {
                email
                password
                fullMessages
              }
            }
          }
        `.replaceAll('\n', ''),
        { email, password }
      );
      return login;
    },
    queryOptions
  );
}

export function signUp({
  fullName,
  email,
  password,
  queryOptions,
}: SignUpQuery) {
  return useQuery(
    ['signUp', fullName, email, password],
    async () => {
      const signUp = await graphQLClient.request(
        gql`
          mutation RegisterUser(
            $fullName: String!
            $email: String!
            $password: String!
          ) {
            registerUser(
              input: { fullName: $fullName, email: $email, password: $password }
            ) {
              status
              recordUuid
              record {
                id
                uuid
                fullName
                createdAt
                updatedAt
                deletedAt
              }
              errors {
                fullName
                email
                password
                fullMessages
              }
            }
          }
        `,
        { fullName, email, password }
      );
      return signUp;
    },
    queryOptions
  );
}
