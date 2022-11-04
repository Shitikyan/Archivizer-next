import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.API_URL || '';

export const graphQLClient = new GraphQLClient(API_URL, {});
