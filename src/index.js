import { isDemoMode } from './config';
import { demoLink } from './demo/link';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { relayStylePagination } from "@apollo/client/utilities";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let __uri = process.env.REACT_APP_GRAPHQL_URL;
// console.log(process.env);

// if I dont have fetchMore i do not need relayStylePagination
// conflicts with the useQuery hook and fetchPolicy: 'network-only' causes rerenders

const client = new ApolloClient({
  link: isDemoMode ? demoLink : new HttpLink({ uri: __uri }),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       posts: relayStylePagination(),
    //     },
    //   },
    // }
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
 
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
