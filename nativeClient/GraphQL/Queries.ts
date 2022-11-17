import { gql } from "@apollo/client";
import { OrderBySelect } from "../types/order";

export const GET_SONGS = gql`
  query (
    $uid: String
    $search: String
    $page: Int
    $pageSize: Int
    $orderBy: OrderBySelect
  ) {
    getSongs(
      search: $search
      uid: $uid
      page: $page
      pageSize: $pageSize
      orderBy: $orderBy
    ) {
      songs {
        _id
        name
        artists
        danceability
        year
        duration_ms
        explicit
        popularity
        rating
        isLiked
      }
      page
      totalPages
    }
  }
`;

export const LOGIN = gql`
  query ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
    }
  }
`;
