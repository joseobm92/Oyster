import React, { useEffect, useState } from "react";

import placeholder from "../images/placeholder.svg";

import grabNFTs from "../utils/wallet-api";

import { useAccount } from "wagmi";

const Gallery = () => {
  const [nfts, getNfts] = useState([]);
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
      console.log(address);
      grabNFTs(address).then((response) => {
        console.log(response);
        getNfts(response);
      });
    },
    onDisconnect() {
      console.log("disconnected");
    },
  });

  //console.log(account.address);

  return (
    <div className="container  mt-5 mb-5">
      <h1>My NFTs</h1>
      <div className="row d-flex justify-content-center">
        {nfts.map((nft, index) => {
          let url;
          const imageUrl = nft.normalized_metadata.image;
          const type = typeof imageUrl;
          if (type === "string" && imageUrl.charAt(0) === "h") {
            url = imageUrl;
          } else {
            url = placeholder;
          }
          return (
            <div key={index} className="col-3">
              <div className="card m-2">
                <img src={url} className="card-img-top custom-img" alt="nft" />
                <div className="card-body custom-body ">
                  <h5 className="card-title p-0 m-0">
                    {nft.normalized_metadata.name}{" "}
                  </h5>
                  <p className="card-text p-0 m-0">{nft.symbol}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
