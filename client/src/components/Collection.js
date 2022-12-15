import { React, useState } from "react";

import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_SINGLE_COLLECTION, QUERY_ME } from "../utils/queries";
import { ADD_COLLECTION } from "../utils/mutations";

import Auth from '../utils/auth'

const Collection = () => {
  const { address } = useParams();
  //const [name, setName] = useState('');
  //const [collectionWebsite, setCollectionWebsite] = useState('');

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
  });

  console.log(address);
  console.log(typeof address);

  const { loading, data } = useQuery(QUERY_SINGLE_COLLECTION, {
    context: { clientName: "endpoint2" },
    variables: { address: address },
  });

  // Check if data is returning from the `QUERY_SINGLE_COLLECTION`
  const collection = data || {};

  console.log(collection);

  if (loading) {
    return <div>Loading...</div>;
  }

  //
  // console.log(name);

  // if(collection.contract.unsafeOpenseaExternalUrl){
  //     setCollectionWebsite(collection.contract.unsafeOpenseaExternalUrl.toString());
  // }


    const collectionWebsite = collection.contract.unsafeOpenseaExternalUrl;
  
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
    avg_price: collection.contract.stats.average,
  };

  const addToFavorites = async () => {
    //setName(collection.contract.name);
    console.log("THIS IS IN THE ADD TO FAVORITES FUNCTION");
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
          website: collectionObj.website,
        },
      });

      console.log(data);
    } catch (error) {
      console.error("error in mutation", error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className='row justify-content-center'>
      <div className='col-sm-2'>
      <div className="card collection">
        <img
          src={collection.contract.unsafeOpenseaImageUrl}
          className="card-img-top"
          alt="nft"
        ></img>
        <div className="card-body">
          <h4 className="card-title">{collection.contract.name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Circulating Supply: {collection.contract.circulatingSupply}
            </li>
            <li className="list-group-item">
              Floor: {collection.contract.stats.floor} ETH
            </li>
            <li className="list-group-item">
              Sales: {collection.contract.stats.totalSales}
            </li>
            <li className="list-group-item"> Website: 
              <a
                href={collectionWebsite}
                className="text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
               {collectionWebsite}
              </a>
            </li>
          </ul>
          {Auth.loggedIn() ? (
            <Link to='/me'> <button className='btn btn-dark' onClick={addToFavorites}>Add To Favorites</button> </Link> 
          ) : (
            <Link to='/login'>
            <button className='btn btn-dark'>Add To Favorites</button>
            </Link>
          )}
          {/* <button className='btn btn-dark' onClick={addToFavorites}>Add To Favorites</button> */}
        </div>
      </div>
      </div>

      </div>

      {/* <h1>Name: {collection.contract.name}</h1>
      <img src={collection.contract.unsafeOpenseaImageUrl} alt="logo"></img>
      <p>Circulating Supply: {collection.contract.circulatingSupply}</p>
      <p>Floor: {collection.contract.stats.floor}</p>
      <p>Sales: {collection.contract.stats.totalSales}</p>
      <p>Volume: {collection.contract.stats.volume}</p>
      <a
        href={collectionWebsite}
        className="text-decoration-none"
        target="_blank"
        rel="noreferrer"
      >
        {collectionWebsite}
      </a>
      <button onClick={addToFavorites}>Add To Favorites</button> */}
      {/* <p>You clicked {name} times</p>
      <button onClick={() => setName(collection.contract.name)}>
        Click me
      </button> */}
    </div>
  );
};

export default Collection;
