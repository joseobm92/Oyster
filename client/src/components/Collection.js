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
  const collectionObj = {
    name: collection.contract.name,
    address: address,
    symbol: collection.contract.symbol,
    supply: collection.contract.circulatingSupply,
    website: collectionWebsite,
    logo: collection.contract.unsafeOpenseaImageUrl,
    sales: collection.contract.stats.totalSales,
    volume: collection.contract.stats.volume,
    floor: collection.contract.stats.floor,
    avg_price: collection.contract.stats.average
  };


  const addToFavorites = async() => {
    //setName(collection.contract.name);
    console.log('THIS IS IN THE ADD TO FAVORITES FUNCTION');
    console.log(collectionObj.name);
    console.log(collectionObj);
    try {
      const { data } = await addCollection({
        variables: {
          address: collectionObj.address,
          avg_price: collectionObj.avg_price,
          logo: collectionObj.logo,
          floor: collectionObj.floor,
          name: collectionObj.name,
          sales: collectionObj.sales,
          supply: collectionObj.supply,
          symbol: collectionObj.symbol,
          volume: collectionObj.volume,
          website: collectionObj.website
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
