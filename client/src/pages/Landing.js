import React from 'react';
import { Link } from 'react-router-dom';

 import { useQuery } from '@apollo/client';
 import { QUERY_TRENDING_WITH_LOGS } from '../utils/queries';

import Auth from '../utils/auth';

import nft2 from '../images/nft2.json'

import Lottie from 'lottie-react'
import eth from '../images/eth.json'
import Footer from '../components/Footer'


const Landing = () => {

  const { loading, error, data } = useQuery(QUERY_TRENDING_WITH_LOGS,
    { 
      context: { clientName: 'endpoint2' },
      variables: {
        timePeriod: "ONE_HOUR",
        orderBy: "SALES",
        first: 5,
        logsFirst2: 5,
      }
    }
  );
 
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const collections = data.trendingCollections.edges;

  console.log(collections)

  return (
    <>
    
      {/* Showcase */}
      <section className=" text-dark p-5 p-lg-0 pt-lg-5 text-center text-sm-start">

        <div className="container">
          <div className="row">
            <div className='col-md-7'>
              <h1 className='showcase'>Real-time NFT market insights <span className="text-warning"></span> </h1>
              <p className="lead my-4">Retrieving NFT metadata from the blockchain is tedious and time-consuming. Our NFT app does the heavy lifting for you across Solana and Ethereum NFTs, making the data you need searchable and accessible.</p>
              <Link to='/collections'>
                <button type="button" className="btn btn-dark mb-3">Trending NFT Collections  <i className="bi bi-arrow-up-right"></i> </button>
              </Link>
              <Link to='/signup' className='text-decoration-none'>
                <button type="button" className="btn btn-dark mb-3 d-block">Sign up  <i className="bi bi-arrow-up-right"></i> </button>
              </Link>
            </div>
            <div className='col-md-4 '>

            <Lottie loop={true} animationData={nft2}/>
            </div>
            {/* <img className="img-fluid d-none d-sm-block blockchain mb-3" src={blockchain} alt="showcase"></img> */}
          </div>
        </div>
      </section>

    {/* data section */}
      <div className='container mt-5'>
        <div className='row'>
          
         
          <div className='col-md-4 align-self-center'>
          <Lottie loop={true} animationData={eth} />
          </div>
          <div className='col-md-8'>
          <h1>Top Sales in the past hour <span className="text-primary"> </span></h1>
          <div className="table-responsive">
            <table className="table table-borderless w-120  mt-4 table-hover">

              <thead>
                <tr>
                  <th scope="col">Collection </th>
                  <th scope="col">Sales </th>
                  <th scope="col">Volume </th>
                  <th scope="col">Floor Price </th>
                  <th scope="col">Avg Price </th>
                </tr>
              </thead>
              {
                collections.map((collection, index) => (
                  <tbody key={index}>

                    <tr>
        
                    <td><Link className="text-decoration-none text-dark" to={`/collections/${collection.node.address}`}>  <img className='logo rounded m-2' src={collection.node.unsafeOpenseaImageUrl} alt=''></img>{collection.node.name} ({collection.node.symbol})</Link></td>
                      <td>{collection.node.stats.totalSales} <br /> <small> - </small></td>
                      <td>{collection.node.stats.volume.toFixed(2)} ETH <br /> <small> - </small></td>
                      <td>{collection.node.stats.floor} ETH <br /> <small> - </small></td>
                      <td>{collection.node.stats.average.toFixed(4)} ETH <br /> <small> - </small> </td>

                    </tr>

                  </tbody>
                ))}
            </table>
          </div>
          </div>

        </div>

      </div>



      {/* Questions Accordion */}
      <section id="questions" className="p-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion accordion-flush" id="questions">
            {/* item 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#question-one">
                  What is an NFT?
                </button>
              </h2>
              <div id="question-one" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#questions">
                <div className="accordion-body">
                Non-Fungible Tokens are unique, easily verifiable digital assets that can represent items such as GIFs, images, videos, music albums, and more. Anything that exists online can be purchased as an NFT, theoretically. 
                <br></br>
                NFTs are different from cryptocurrencies because they’re not interchangeable. Think of Pokémon cards: You can trade them, but a Gastly is not the same as a holographic Charizard. But a bitcoin is indistinguishable from another bitcoin.
                </div>
              </div>
            </div>
            {/* item 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#question-two">
                  Why would I want to own an NFT? Can I make money on it?
                </button>
              </h2>
              <div id="question-two" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#questions">
                <div className="accordion-body">
                One reason to buy an NFT is for its emotional value, which isn’t so different from physical objects...unless you’re a total utilitarian. No one buys lip gloss because they need it. They buy it for the way it makes them feel. The same can be true for a GIF, image, video, or other digital asset.

The other reason is because you think it’s valuable...and will only increase in value. And yes, you can make money off of an NFT by buying and reselling it for more.
                </div>
              </div>
            </div>
            {/* item 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#question-three">
                  What are the different use cases of a blockchain
                </button>
              </h2>
              <div id="question-three" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#questions">
                <div className="accordion-body">
                  <ul>
                    <li>Money Transfer</li>
                    <li>Smart Contracts</li>
                    <li>Supply Chain Management</li>
                    <li>Non-Fungible Tokens (NFTs)</li>
                    <li>Personal Identity Security</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* item 4 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#question-four">
                  Common Cryptocurrency Terminology
                </button>
              </h2>
              <div id="question-four" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#questions">
                <div className="accordion-body">
                  <ul>
                    <li>Market Capitalization: is calculated by Price X Circulating Supply</li>
                    <li>Circulating Supply: # of coins circulating in the market and in the general public's hands</li>
                    <li>Total Supply: Is the total amount of coins in existence right now</li>
                    <li>Max Supply: Maximum amount of coins that will ever exist in the lifetime of the cryptocurrency</li>
                    <li>Coin vs Token: A Coin is a cryptocurrency that can operate independently.

                      A Token is a cryptocurrency that depends on another cryptocurrency as a platform to operate. Check out
                      the crypto tokens listings to view a list of tokens and their respective platforms. </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* item 5 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#question-five">
                  Investing in Crypto
                </button>
              </h2>
              <div id="question-five" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#questions">
                <div className="accordion-body">
                  <ul>
                    <li>Create an <a href="/signup">Account</a></li>
                    <li>Refer to one of the major Exchanges on the website <a href="/exchanges">Visit Exchanges</a></li>
                    <li>We recommend a DYOR mindset when it comes to investing in the crypto market due to its high
                      volatility. Invest at your own risk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


<Footer/>
    </>
  );
};
export default Landing;