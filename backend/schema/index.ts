const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Song {
    _id: ID!
    name: String!
    artists: [String]!
    year: Int!
    energy: Float!
    popularity: Int!
    tempo: Float!
    duration_ms: Int!
    danceability: Float!
    explicit: Boolean!
    acousticness: Float!
    key: Int!
    rating: Int
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    likedSongs: [String]
  }

  type UserMin {
    _id: ID
    username: String
    likedSongs: [String]
  }

  type SongQuery {
    songs: [Song!]
    page: Int!
    totalPages: Int!
  }

  enum Sort {
    asc
    desc
  }

  input OrderBySelect {
    year: Sort
    popularity: Sort
    danceability: Sort
    duration_ms: Sort
  }


  input SongInput {
    artist: [String]!
    song: String!
    year: Int!
  }

  type Query {
    getSongs(orderBy: OrderBySelect, page: Int, pageSize: Int, search: String, year: Int): SongQuery
    login(username: String!, password: String!): UserMin
  }

  type Mutation {
    rateSong(_id: ID!, rating: Int): Song
    newUser(username: String!, password: String!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)