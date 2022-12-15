import React from 'react'
import { useQuery } from "@apollo/client";
import { QUERY_COLLECTION_FOR_ADDRESS } from '../utils/queries';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";


const Gallery = () => {

    const account = useAccount({
        onConnect({ address, connector, isReconnected}) {
          console.log('Connected', {address, connector, isReconnected})
          console.log(address);
    
        },
        onDisconnect() {
          console.log('disconnected');
        }
      });
    

    console.log(account.address);

    const { loading, error, data } = useQuery(QUERY_COLLECTION_FOR_ADDRESS, 
        { 
        context: { clientName: 'endpoint2' },
        variables: {
            address: account.address,
        }
        });
    //console.log(data);
    if (loading) return null;
    if (error) return `Error! ${error}`;
    const collections =  data.wallet.tokens.edges;
    
    console.log(collections[0].node.images[1].url)
    console.log(typeof collections[0].node.images[1].url)
      
    // collections.map((collection, index) => (
    //     collection.node.images[1].url ? collection.node.images[1].url : "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
    // ))

  return (
    <div className="container mt-5 mb-5">
      <div className='row justify-content-center'>

      {
        collections.map((collection, index) => (
            <div key={index} className='col-sm-2'>
                <div className="card collection">
                {/* {console.log(collection.node.images[1].url)} */}
                        {/* <img
                        src={ collection.node.images[1].url ? collection.node.images[1].url : "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"}
                        className="card-img-top"
                        alt="nft"
                        /> */}


                <div className="card-body">
                <h4 className="card-title">{collection.node.contract.name} #{collection.node.contract.tokenId} </h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {collection.node.contract.symbol}
              
            </li>
          </ul>
        </div>
      </div>
      </div>


        ))
        
        }

      </div>
    </div>
  )
}



export default Gallery
