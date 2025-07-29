import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
	uri: "http://chocoisme.local/graphql",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
