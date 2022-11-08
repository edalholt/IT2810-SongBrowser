import { getSongsArgs, rateSongArgs, searchQueryType } from "../types/resolvers"
const Song = require("../models/song")

module.exports = {
  getSongs: async (args: getSongsArgs) => {
    try {
      /*  Default values for page and page size if not set,
          to prevent sending all data by accident*/
      const page = args.page || 1
      const limit = args.pageSize || 10
      const orderBy = args.orderBy || {}
      // Search for string if there is any, else return regex to match all.
      const search: string | RegExp = args.search || /.*/

      const searchQuery: searchQueryType = {
        $or:[
          {name: new RegExp(search, 'i')},
          {artists: new RegExp(search, 'i')}
        ],
      };
      // Add year if requested
      (args.year) ? (searchQuery["year"] = args.year) : (null)

      // Fetch from DB
      const songsFetched = await Song.find(searchQuery).limit(limit).skip((page-1)*limit).sort(orderBy)
      const count: number = await Song.find(searchQuery).count();
      const totalPages: number = Math.ceil(count / limit)
  
      // Return data by format defined in schema
      return {
        songs: songsFetched,
        page: page,
        totalPages: totalPages
      }
    } catch (error) {
      throw error
    }
  },

  // Connected to mutation for song rating.
  rateSong: async (args: rateSongArgs) => {
    try {
      // Manipulates a specific song by id, returns new document.
      // https://mongoosejs.com/docs/api.html
      return await Song.findByIdAndUpdate(args._id, {rating: args.rating}, {returnOriginal: false})
    } catch (error) {
      throw error
    }
  },
}