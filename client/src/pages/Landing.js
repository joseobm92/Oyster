import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_TRENDING_WITH_LOGS } from "../utils/queries";

import Auth from "../utils/auth";

import nft2 from "../images/nft2.json";
import sharing from "../images/sharing.json";
import Lottie from "lottie-react";
import eth from "../images/eth.json";
import Footer from "../components/Footer";
import ethereum from "../images/ethereum.svg";

const Landing = () => {
  const [nftCollections, getNftCollections] = useState("");

  const { loading, error, data } = useQuery(QUERY_TRENDING_WITH_LOGS, {
    context: { clientName: "endpoint2" },
    variables: {
      timePeriod: "ONE_HOUR",
      orderBy: "SALES",
      first: 5,
      logsFirst2: 5,
    },
  });

  // useEffect(() => {
  //   const collectionData = data?.trendingCollections.edges || [];
  //   getNftCollections(collectionData);
  //   console.log(nftCollections);
  // });

  if (loading) {
    return <p>loading</p>;
  } else {
  }
  if (error) return `Error! ${error}`;

  const collections = data.trendingCollections.edges;

  // console.log(collections);

  return (
    <>
      {/* Showcase */}
      <section className=" text-dark p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container ">
          <div className="row">
            <div className="col-md-7 bg-white rounded">
              <h1 className="showcase">
                Real-Time NFT Market Insights{" "}
                <span className="text-warning"></span>{" "}
              </h1>
              <p className="lead my-4">
                Retrieving NFT data from the blockchain is tedious and
                time-consuming. Our app does the heavy lifting for you across
                Ethereum NFTs, making the data you need searchable and
                accessible.
              </p>
              <Link to="/collections">
                <button type="button" className="btn btn-dark mb-3">
                  Trending NFT Collections{" "}
                  <i className="bi bi-arrow-up-right"></i>{" "}
                </button>
              </Link>
              <Link to="/signup" className="text-decoration-none">
                <button type="button" className="btn btn-dark mb-3 d-block">
                  Sign up <i className="bi bi-arrow-up-right"></i>{" "}
                </button>
              </Link>
            </div>
            <div className="col-md-4 ">
              <Lottie loop={true} animationData={nft2} />
            </div>
            {/* <img className="img-fluid d-none d-sm-block blockchain mb-3" src={blockchain} alt="showcase"></img> */}
          </div>
        </div>
      </section>

      {/* data section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 align-self-center">
            <Lottie loop={true} animationData={eth} />
          </div>
          <div className="col-md-8 border rounded p-4">
            <h1>
              Top <span className="text-primary">Sales </span> in the past hour
            </h1>
            <div className="table-responsive">
              <table className="table table-borderless w-120  mt-4 table-hover bg-white ">
                <thead>
                  <tr>
                    <th scope="col">Collection </th>
                    <th scope="col">Sales </th>
                    <th scope="col">Volume </th>
                    <th scope="col">Floor Price </th>
                    <th scope="col">Avg Price </th>
                  </tr>
                </thead>
                {collections.map((collection, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/collections/${collection.node.address}`}
                        >
                          {" "}
                          <img
                            className="logo rounded m-2"
                            src={collection.node.unsafeOpenseaImageUrl}
                            alt=""
                          ></img>
                          {collection.node.name} ({collection.node.symbol})
                        </Link>
                      </td>
                      <td>
                        {collection.node.stats.totalSales} <br />{" "}
                        <small> - </small>
                      </td>
                      <td>
                        {collection.node.stats.volume.toFixed(2)}{" "}
                        <img
                          className="eth-logo"
                          src={ethereum}
                          alt="eth-logo"
                        />{" "}
                        <br /> <small> - </small>
                      </td>
                      <td>
                        {collection.node.stats.floor}{" "}
                        <img
                          className="eth-logo"
                          src={ethereum}
                          alt="eth-logo"
                        />{" "}
                        <br /> <small> - </small>
                      </td>
                      <td>
                        {collection.node.stats.average.toFixed(4)}{" "}
                        <img
                          className="eth-logo"
                          src={ethereum}
                          alt="eth-logo"
                        />{" "}
                        <br /> <small> - </small>{" "}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase 2 */}
      <section className=" text-dark p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container ">
          <div className="row">
            <div className="col-md-7 bg-white rounded">
              <h2 className="showcase">
                Share your Project & Collaborate with others!
              </h2>
              <p className="lead my-4">
                Whether you are viewing data on your favorite collections,
                collaborating with others on projects or keeping up to date with
                what's trending, Oyster is your go to place.
                <br></br>
                Sign up to become a part of the Oyster community.
              </p>
              <Link to="/projects">
                <button type="button" className="btn btn-dark mb-3">
                  Explore Projects <i className="bi bi-arrow-up-right"></i>{" "}
                </button>
              </Link>
              <Link to="/signup" className="text-decoration-none">
                <button type="button" className="btn btn-dark mb-3 d-block">
                  Become a member <i className="bi bi-arrow-up-right"></i>{" "}
                </button>
              </Link>
            </div>
            <div className="col-md-4 align-self-center ">
              <Lottie loop={true} animationData={sharing} />
            </div>
            {/* <img className="img-fluid d-none d-sm-block blockchain mb-3" src={blockchain} alt="showcase"></img> */}
          </div>
        </div>
      </section>

      {/* Questions Accordion */}
      <section id="questions" className="p-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion accordion-flush" id="questions">
            {/* item 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-one"
                >
                  What is an NFT?
                </button>
              </h2>
              <div
                id="question-one"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions"
              >
                <div className="accordion-body">
                  Non-Fungible Tokens are unique, easily verifiable digital
                  assets that can represent items such as GIFs, images, videos,
                  music albums, and more. Anything that exists online can be
                  purchased as an NFT, theoretically.
                  <br></br>
                  NFTs are different from cryptocurrencies because they’re not
                  interchangeable. Think of Pokémon cards: You can trade them,
                  but a Gastly is not the same as a holographic Charizard. But a
                  bitcoin is indistinguishable from another bitcoin.
                </div>
              </div>
            </div>
            {/* item 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-two"
                >
                  What Data can I view?
                </button>
              </h2>

              <div
                id="question-two"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions"
              >
                <div className="accordion-body">
                  <small>
                    Currently all data is based off the 1 hour chart
                  </small>
                  <ul>
                    <li>Top 5 NFT Collections Trending by volume </li>
                    <li>Top 50 Collections Trending by Sales </li>
                    <li>Top 50 Collections Trending by Volume </li>
                    <li>
                      Single Collection Floor Price, Volume, Number of Sales,
                      Supply & Avg Purchase Price{" "}
                    </li>
                    <li>
                      Single Collection Description, Website, Token Standard, &
                      Official Etherscan Link{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* item 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-three"
                >
                  Why Should I Sign Up?
                </button>
              </h2>
              <div
                id="question-three"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      Personal Dashboard To Track your Favorite NFT Collections
                    </li>
                    <li>Create Projects</li>
                    <li>Comment on Projects</li>
                    <li>
                      Discover what others are working on or creating and
                      collaborate projects
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* item 4 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-four"
                >
                  What is the "Connect Wallet" Button for?
                </button>
              </h2>
              <div
                id="question-four"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions"
              >
                <div className="accordion-body">
                  The button is an extra feature that allows the app to fetch
                  data from the blockchain. Specifically a user's NFTs which you
                  can view in your own private gallery in the Dashboard. To use
                  this feature a user must own a{" "}
                  <a
                    className="text-decoration-none"
                    src="https://metamask.io/"
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MetaMask
                  </a>{" "}
                  wallet
                </div>
              </div>
            </div>
            {/* item 5 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question-five"
                >
                  I'm new, what can I do to get started?
                </button>
              </h2>
              <div
                id="question-five"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      Create an{" "}
                      <a href="/signup " className="text-decoration-none">
                        Account
                      </a>
                    </li>
                    <li>Explore the different collections</li>
                    <li>
                      Refer to one of the major Marketplaces below{" "}
                      <ul>
                        <li>
                          <a
                            src="https://opensea.io/"
                            href="https://opensea.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                          >
                            Opensea
                          </a>
                        </li>
                        <li>
                          <a
                            src="https://looksrare.org/"
                            href="https://looksrare.org/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                          >
                            LooksRare
                          </a>
                        </li>
                        <li>
                          <a
                            src="https://blur.io/"
                            href="https://blur.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                          >
                            Blur
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      We recommend a DYOR mindset when it comes to buying
                      digital assets. Digital assets are built on the blockchain
                      and are dependant of crypto. Similar to the crypto market
                      Digital Assets/Collectibles (NFTs) are highly volatile.
                      Collect at your own risk.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default Landing;
