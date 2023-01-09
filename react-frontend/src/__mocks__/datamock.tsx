import { GET_SONGS } from "../GraphQL/Queries";

export const mocks = [
    {
      request: {
        query: GET_SONGS,
        variables: {
          name: "Sad Forever"
        }
      },
      result: {
        data: {
          songs: { _id:"634b4ee3dad5dd1cb9c722c4", name:"Sad Forever", artists:"Lauv", year:"2020", danceability: "0.527", popularity:"71", duration:"203507"}
        }
      }
    }
  ];