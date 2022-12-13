import { useQuery, gql } from "@apollo/client";

// Query single user
export const QUERY_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    email
    courseCount
    courses {
      _id
      courseName
      startDate
      endDate
      description
      instructor
    }
  }
}
`;

// Query Trending collections by Volume
export const QUERY_TRENDING_COLLECTIONS = gql`
query TrendingCollections {
  trendingCollections(orderBy: VOLUME, orderDirection: DESC) {
    edges {
      node {
        address
        ... on ERC721Contract {
          name
          stats {
            totalSales
            average
            ceiling
            floor
            volume
          }
          symbol
          unsafeOpenseaImageUrl
        }
      }
    }
    pageInfo {
      endCursor
    }
  }
}`;

// Query Single Collection STATS LAST 24 HORUS
export const QUERY_SINGLE_COLLECTION = gql`
query CollectionStats($address: String!) {
  contract(address: $address) {
    ... on ERC721Contract {
      stats {
        floor
        volume
        totalSales
        ceiling
        average
      }
      circulatingSupply
      name
      symbol
      tokenStandard
      unsafeOpenseaDescription
      unsafeOpenseaExternalUrl
      unsafeOpenseaImageUrl
    }
    address
  }
}`;