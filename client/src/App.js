import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './utils/auth';
/// IMPORT PAGES ///
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
/// IMPORT COMPONENTS ///
import ProtectRoute from './components/ProtectRoute';
import Nav from './components/Nav';
import Collection from './components/Collection';
import './App.css';
import Collections from './pages/Collections'
import Footer from './components/Footer'

const httpLink = createHttpLink({
  uri: '/graphql',
});

// ICY TOOLS API ENDPOINT
const endpoint2 = createHttpLink({
  uri: 'https://graphql.icy.tools/graphql',
})
/// SET CONTEXT ///
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const endpoint1 = authLink.concat(httpLink);
/// SET UP CLIENT ///
const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'endpoint2',
    endpoint2, //if above
    endpoint1
),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <>
    
    <ApolloProvider client={client}>
      <Router>
      <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/me' element={<Dashboard />} />
          <Route path='/collections/:address' element={<Collection />} />
          <Route path='/collections' element={<Collections />} />
           <Route
            path='dashboard/:userId'
            element={Auth.loggedIn() ? <Dashboard /> : <ProtectRoute />}
          /> 
        </Routes>
        < Footer/>
      </Router>
    </ApolloProvider>
    </>

  );
}
export default App;