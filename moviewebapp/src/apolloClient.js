import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://tmdb-api.saeris.io/.netlify/functions/tmdb-api", 
    headers: {
      Authorization: `Bearer 75fa8e2883c6dc470d1dd3ebe09d65e9`
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
