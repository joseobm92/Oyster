import React from 'react';

import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_COLLECTION } from '../utils/queries';


const Collection =  () => {
  const { address } = useParams();


  console.log(address);
  console.log(typeof address);

  const { loading, data } = useQuery(QUERY_SINGLE_COLLECTION, 
    {
      context: { clientName: 'endpoint2' },
      variables: { address: address },
    },
  );

  // Check if data is returning from the `QUERY_SINGLE_COLLECTION`
  const collection =  data || {};


  console.log(collection);

  if (loading) {
    return <div>Loading...</div>;
  }

  const collectionWebsite = collection.contract.unsafeOpenseaExternalUrl.toString()
  console.log(typeof collectionWebsite);
  return (
    <div className='container'>
    <h1>Name: {collection.contract.name}</h1>
    <img src={collection.contract.unsafeOpenseaImageUrl} alt='logo'></img>
    <p>Circulating Supply: {collection.contract.circulatingSupply}</p>
    <p>Floor: {collection.contract.stats.floor}</p>
    <p>Sales: {collection.contract.stats.totalSales}</p>
    <p>Volume: {collection.contract.stats.volume}</p>
    <a href={collectionWebsite} className='text-decoration-none' 
       target='_blank' rel="noreferrer" >
       {collectionWebsite}
    </a>
    </div>
  );
};

export default Collection;
