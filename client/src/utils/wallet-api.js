import axios from "axios";



const grabNFTs = async (address) => {
  const options = {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
    params: { chain: "eth", format: "decimal", normalizeMetadata: "true" },
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.REACT_APP_MORALIS_API,
    },
  };
  console.log(process.env.REACT_APP_MORALIS_API)
  try {
    const response = await axios.request(options);
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

export default grabNFTs;
