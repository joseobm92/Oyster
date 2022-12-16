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
    <div className="container mt-5 mb-5">
      <h1>My NFTs</h1>
      <div className="row justify-content-center">
        {nfts.map((nft, index) => {
          let url;
          const imageUrl = nft.normalized_metadata.image;
          let firstLetter;
          if (imageUrl === null) {
            url = placeholder;
          } else if (typeof imageUrl === String) {
            firstLetter = imageUrl.charAt(0);
            console.log(firstLetter);
            if (firstLetter === "i") {
              url = placeholder;
            }
            url = imageUrl;
          } else {
            url = imageUrl;
          }
          return (
            <div key={index} className="col-md-4">
              <div className="card">
                <img src={url} className="card-img-top" alt="nft" />
                <div className="card-body">
                  <h4 className="card-title">
                    {nft.normalized_metadata.name}{" "}
                  </h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{nft.symbol}</li>
                  </ul>
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
