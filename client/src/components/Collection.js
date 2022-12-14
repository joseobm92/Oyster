import { React, useState } from 'react';

import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_COLLECTION, QUERY_ME } from '../utils/queries';
import { ADD_COLLECTION } from '../utils/mutations';


const Collection =  () => {
  const { address } = useParams();
  //const [name, setName] = useState('');


  const [addCollection, { error }] = useMutation(ADD_COLLECTION, {
    // update(cache, { data: { addCollection }}) {
    //   try {
    //     const { collections } = cache.readQuery({ query: QUERY_SINGLE_COLLECTION})

    //     cache.writeQuery({
    //       query: QUERY_SINGLE_COLLECTION,
    //       data: { collections: [addCollection, ...collections] },
    //     });
    //   } catch (error) {
    //     console.error("error in cache write", error)
    //   }

    //   // update me object's cache
    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   cache.writeQuery({
    //     query: QUERY_ME,
    //     data: { me: { ...me, collections: [...me.collections, addCollection] } },
    //   });
    // },
  })
  



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

  // 
  // console.log(name);

  const collectionWebsite = collection.contract.unsafeOpenseaExternalUrl.toString();
  const name = collection.contract.name

  const addToFavorites = async() => {
    //setName(collection.contract.name);
    console.log('THIS IS IN THE ADD TO FAVORITES FUNCTION');
    console.log(name);
    console.log(address);
    try {
      const { data } = await addCollection({
        variables: {
          name,
          address
        },
      });

      console.log(data)

    } catch (error) {
      console.error("error in mutation", error)
    }

  }
 
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
    <button onClick={addToFavorites}>Add To Favorites</button>
    {/* <p>You clicked {name} times</p>
      <button onClick={() => setName(collection.contract.name)}>
        Click me
      </button> */}
    </div>
  );
};

export default Collection;
