import { gql } from '@apollo/client'

export const RATE_SONG = gql`
  mutation($id: ID!, $rating: Int) {
    rateSong(_id: $id, rating: $rating){
      name
      rating
      _id
    }
  }
`;


export const REGISTER = gql`
  mutation($username: String!, $password: String!) {
    newUser(username: $username, password: $password){
      _id
    }
  }
`;