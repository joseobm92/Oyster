import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_COLLECTIONS_WITH_VARS } from "../utils/queries";
import Auth from "../utils/auth";

const Volume = () => {
  const { loading, error, data } = useQuery(QUERY_COLLECTIONS_WITH_VARS, {
    context: { clientName: "endpoint2" },
    variables: {
      timePeriod: "ONE_HOUR",
      orderBy: "VOLUME",
      first: 100,
    },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const collections = data.trendingCollections.edges;

  console.log(collections);

  if (data) {
    return (
      <>
        <Link to="/collections/trending">
          {" "}
          <button className='btn btn-dark m-2'>Trending <i class="bi bi-arrow-up-right-square"></i></button>
        </Link>
        <Link to="/collections/sales">
          <button className='btn btn-dark m-2'>Sales <i class="bi bi-arrow-up-right-square"></i></button>
        </Link>
        <div className="container">
          {Auth.loggedIn() ? (
            <p className="text-end mt-2">
              {" "}
              Welcome back {Auth.getUser().data.username}
            </p>
          ) : (
            <p> </p>
          )}
          <h1>
            Trending By <span className="text-primary">Volume  </span>
          </h1>

          <div className="table-responsive">
            <table className="table table-borderless w-120  mt-4  bg-white table-hover ">
              <thead>
                <tr>
                  <th scope="col">Collection </th>
                  <th scope="col">Floor Price </th>
                  <th scope="col">Volume </th>
                  <th scope="col">Sales </th>
                  <th scope="col">Avg Price </th>
                </tr>
              </thead>
              {collections.map((collection, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      {" "}
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
                      {collection.node.stats.floor} ETH <br />{" "}
                      <small> - </small>
                    </td>
                    <td>
                      {collection.node.stats.volume.toFixed(2)} ETH <br />{" "}
                      <small> - </small>{" "}
                    </td>
                    <td>
                      {collection.node.stats.totalSales} <br />{" "}
                      <small> - </small>
                    </td>
                    <td>
                      {collection.node.stats.average.toFixed(4)} ETH <br />{" "}
                      <small> - </small>{" "}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md">
            <h1> Image</h1>
            <p></p>
          </div>
          <div className="col-md">
            <h2>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volume;
