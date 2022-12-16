import axios from "axios";

import { useAccount } from "wagmi";

const grabNFTs = async (address) => {
  // const account = useAccount({
  //     onConnect({ address, connector, isReconnected }) {
  //       console.log("Connected", { address, connector, isReconnected });
  //       console.log(address);
  //     },
  //     onDisconnect() {
  //       console.log("disconnected");
  //     },
  //   });

  //   const [nfts, getNfts] = useState("");

  //   console.log(account.address);

  const options = {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
    params: { chain: "eth", format: "decimal", normalizeMetadata: "true" },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "au25Goy32rbHToxh9HvU75UXZvmEyD2xwSsXCFVdGFWtsJPqkWBGLHiGIy1KAf7H",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.result);
    //   getNfts(response.data.result);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

export default grabNFTs;
