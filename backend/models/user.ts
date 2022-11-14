import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
      },
    likedSongs: {
        type: [String],
        required: false,
      },

  },
  {collection: "users"}
)

module.exports = model("User", userSchema)