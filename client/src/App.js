import React from "react";

// Import APOLLO CLIENT React Router & Authentication
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./utils/auth";

// Import  RainbowKit, Wagmi & Ethers
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

/// IMPORT PAGES ///
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SingleProject from "./pages/SingleProject";
import Collections from "./pages/Collections";
import Projects from "./pages/Projects";

/// IMPORT COMPONENTS ///
import ProtectRoute from "./components/ProtectRoute";
import Nav from "./components/Nav";
import Collection from "./components/Collection";
import "./App.css";

import ProjectList from "./components/ProjectList";
import Footer from "./components/Footer";
import Trending from "./components/Trending";
import Volume from "./components/Volume";
import Sales from "./components/Sales";

// Particles Bg
import Particles from "./components/Particles";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// ICY TOOLS API ENDPOINT
const endpoint2 = createHttpLink({
  uri: "https://graphql.icy.tools/graphql",
});
/// SET CONTEXT ///
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const endpoint1 = authLink.concat(httpLink);
/// SET UP CLIENT ///
const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "endpoint2",
    endpoint2, //if above
    endpoint1
  ),
  cache: new InMemoryCache(),
});

// Configure chains, connector & wagmi client
const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "w3CWn13KLWvDk0eWH6eo9qJL3zeP-2Dg" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Oyster",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          <Particles />

          <ApolloProvider client={client}>
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/me" element={<Dashboard />} />
                <Route path="/collections" element={<Collections />} />

                <Route path="/collections/:address" element={<Collection />} />
                <Route path="/collections/trending" element={<Trending />} />
                <Route path="/collections/volume" element={<Volume />} />
                <Route path="/collections/sales" element={<Sales />} />
                <Route path="/projects" element={<Projects />} />
                <Route
                  path="/projects/:projectId"
                  element={<SingleProject />}
                />
                <Route
                  path="dashboard/:userId"
                  element={Auth.loggedIn() ? <Dashboard /> : <ProtectRoute />}
                />
              </Routes>
              {/* <Footer /> */}
            </Router>
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
export default App;
