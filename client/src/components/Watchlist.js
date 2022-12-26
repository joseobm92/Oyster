import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import ethereum from "../images/ethereum.svg";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { REMOVE_COLLECTION } from "../utils/mutations";

import Auth from "../utils/auth";

const Watchlist = () => {
  const { userId } = useParams();

  console.log(userId);

  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const [removeCollection, { error }] = useMutation(REMOVE_COLLECTION, {});

  console.log(data);

  console.log(Auth.getUser());

  const user = data?.me || data?.user || {};
  console.log(user);
  //  navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const removeFromFavorites = async (id) => {
    try {
      console.log("This is in remove from favorites func", id);

      const { data } = await removeCollection({
        variables: {
          collectionId: id,
        },
        refetchQueries: [
          {
            query: QUERY_ME,
          },
        ],
      });

      console.log(data);
    } catch (error) {
      console.error("This is in the remove from favorites", error);
    }
  };

  //const displayWatchlist

  return (
    <div className="container mt-4">
      <div className="table-responsive bg-white">
        <table className="table table-borderless w-120  mt-4 table-hover ">
          <thead>
            <tr>
              <th scope="col">Collection </th>
              <th scope="col">Floor Price </th>
              <th scope="col">Avg Price </th>
              <th scope="col">Supply </th>
              <th scope="col">Volume </th>
            </tr>
          </thead>
          {user.collections.map((favorite, index) => (
            <tbody key={index}>
              <tr>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/collections/${favorite.address}`}
                  >
                    {" "}
                    <img
                      className="logo rounded m-2"
                      src={favorite.logo}
                      alt=""
                    ></img>
                    {favorite.name}{" "}
                  </Link>
                </td>
                <td>
                  {favorite.floor.toFixed(4)}{" "}
                  <img className="eth-logo" src={ethereum} alt="eth-logo" />{" "}
                  <br /> <small> - </small>
                </td>
                <td>
                  {favorite.avg_price.toFixed(4)}{" "}
                  <img className="eth-logo" src={ethereum} alt="eth-logo" />{" "}
                  <br /> <small> - </small>{" "}
                </td>
                <td>
                  {favorite.supply} <br /> <small> - </small>{" "}
                </td>
                <td>
                  {favorite.volume.toFixed(2)}{" "}
                  <img className="eth-logo" src={ethereum} alt="eth-logo" />{" "}
                  <br /> <small> - </small>{" "}
                </td>
                <td>
                  <button
                    onClick={() => removeFromFavorites(favorite._id)}
                    class="btn rounded delete-btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
