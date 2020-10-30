const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types.ObjectId;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:'https://res.cloudinary.com/shubinsta-clone008/image/upload/v1603893950/user_z7ouxu.png'
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);
