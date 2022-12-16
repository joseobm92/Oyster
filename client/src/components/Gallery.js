import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COLLECTION_FOR_ADDRESS } from "../utils/queries";

// import Moralis from "moralis";
// import { EvmChain } from "@moralisweb3/evm-utils";
import axios from "axios";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Gallery = () => {
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
      console.log(address);
    },
    onDisconnect() {
      console.log("disconnected");
    },
  });

  const [nfts, getNfts] = useState("");

  console.log(account.address);

  const options = {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/${account.address}/nft`,
    params: { chain: "eth", format: "decimal", normalizeMetadata: "true" },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "au25Goy32rbHToxh9HvU75UXZvmEyD2xwSsXCFVdGFWtsJPqkWBGLHiGIy1KAf7H",
    },
  };

  const moralisRequest = async () => {
    try {
      const response = await axios.request(options);
      //console.log(response.data.result);
      getNfts(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    moralisRequest();
    console.log("use effect");
    console.log(nfts);
  }, []);

  // const address = account.address;
  // const chain = EvmChain.ETHEREUM;

  // await Moralis.start({
  //   apiKey: "au25Goy32rbHToxh9HvU75UXZvmEyD2xwSsXCFVdGFWtsJPqkWBGLHiGIy1KAf7H",
  // });

  // const response = await Moralis.EvmApi.nft.getWalletNFTs({
  //   address,
  //   chain,
  // });
  // console.log(response);

  // const { loading, error, data } = useQuery(QUERY_COLLECTION_FOR_ADDRESS, {
  //   context: { clientName: "endpoint2" },
  //   variables: {
  //     address: account.address,
  //   },
  // });
  // //console.log(data);
  // if (loading) return null;
  // if (error) return `Error! ${error}`;
  // const collections = data.wallet.tokens.edges;

  // console.log(collections);
  //console.log(typeof collections[11].node.images[1].url);

  // collections.map((collection, index) => (
  //     collection.node.images[1].url ? collection.node.images[1].url : "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
  // ))

  return (
    <div className="container mt-5 mb-5">
      <h1>My NFTs</h1>
      <div className="row justify-content-center">
        {nfts.map((nft, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
              <img
                src={nft.normalized_metadata.image}
                className="card-img-top"
                alt="nft"
              />
              <div className="card-body">
                <h4 className="card-title">{nft.normalized_metadata.name} </h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{nft.symbol}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        {/* {collections.map((collection, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
               <img
                  src={collection.node.images[1].url || " "}
                  className="card-img-top"
                  alt="nft"
                /> 
              <div className="card-body">
                <h4 className="card-title">
                  {collection.node.contract.name} #{collection.node.tokenId}{" "}
                </h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {collection.node.contract.symbol}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Gallery;
