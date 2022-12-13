import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav'
import { useQuery } from '@apollo/client';
import { QUERY_TRENDING_COLLECTIONS } from '../utils/queries';
const Landing = () => {
  const {loading, error, data} = useQuery(QUERY_TRENDING_COLLECTIONS, { context: {clientName: 'endpoint2'}});
  //console.log(data);
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const collections = data.trendingCollections.edges
  console.log(collections);
  if(data) {
    return (
      <>
        <div className="flex-row justify-space-between my-4">
        {
          collections.map((collection) => (

            <div key={collection.node.symbol} className="col-12 col-xl-6">
            <Link className="btn-light text-dark"
                  to={`/collections/${collection.node.address}`}>
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {collection.node.name} <br />
                  <img className='logo rounded m-2' src={collection.node.unsafeOpenseaImageUrl} alt=''></img>
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    Floor {collection.node.stats.floor} ETH</span>
                </h4>
              </div>
              </Link>
            </div>

          ))}
      </div>
      </>
    );
  }
  return (
    <div>
      <Nav/>
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
export default Landing;