import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_TRENDING_COLLECTIONS } from '../utils/queries';

import Auth from '../utils/auth';

const Collections = () => {
  const { loading, error, data } = useQuery(QUERY_TRENDING_COLLECTIONS, { context: { clientName: 'endpoint2' } });
  //console.log(data);
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const collections = data.trendingCollections.edges
  console.log(collections);
  if (data) {
    return (
      <>

        <div className="container">
          {Auth.loggedIn() ? (
            <p> Welcome back {Auth.getUser()}</p>
          ) : (
            <p> </p>

          )}
          <h1>Trending Collections <span className="text-primary"> </span></h1>

          <div className="table-responsive">
            <table className="table table-borderless w-120  mt-4 table-hover ">

              <thead>
                <tr>
                  
                  <th scope="col">Collection </th>
                  <th scope="col">Floor Price </th>
                  <th scope="col">Avg Price </th>
                </tr>
              </thead>
              {
                collections.map((collection) => (
                  <tbody>

                    <tr>
                      
                      <Link className="text-decoration-none text-dark" to={`/collections/${collection.node.address}`}> <td> <img className='logo rounded m-2' src={collection.node.unsafeOpenseaImageUrl} alt=''></img>{collection.node.name} ({collection.node.symbol})</td></Link>
                      <td>{collection.node.stats.floor} ETH <br /> <small> - </small></td>
                      <td>{collection.node.stats.average} ETH <br /> <small> - </small> </td>

                    </tr>

                  </tbody>
                ))}
            </table>
          </div>
        </div>

      </>
    );
  }
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md'>
            <h1> Image</h1>
            <p></p>
          </div>
          <div className='col-md'>
            <h2> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Collections;