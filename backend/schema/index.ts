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
  }

  type Mutation {
    rateSong(_id: ID!, rating: Int): Song
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)