import mongoose from "mongoose"
const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,

    // use toJSON hook function transform
    // is always called on res.json BEFORE data is sent
    // can be used to hide confidential information to frontend like passwords
    toJSON: {
      transform: (doc, documentToReturn) => {
        delete documentToReturn.password
        return documentToReturn
      },
    },
  }
)

const User = model("User", UserSchema)

export default User
