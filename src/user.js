const mongoose = require("mongoose");
const BlogPost = require("./blogPost");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than 2 chars."
    },
    required: [true, "Name is required"]
  },
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost"
    }
  ]
});

UserSchema.virtual("postCount").get(function() {
  return this.posts.count;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
