const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Test of Association", () => {
  let joe, blogPost, comment;
  it("Create Test", done => {
    joe = new User({ name: "Cansinn" });
    blogPost = new BlogPost({ title: "Blog Post Title" });
    comment = new Comment({ content: "Congrats on great post" });
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it("Saves a relation between a user a blogpost.", done => {
    User.findOne({ name: "Cansinn" })
      .populate("blogPosts")
      .then(user => {
        console.log(user);
        done();
      });
  });

  it("saves a full relation tree", done => {
    User.findOne({ name: "Cansinn" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        console.log(user.blogPosts[0].comments);
        done();
      });
  });

  it("can sort, skip and limit the result set", done => {
    User.find({})
      .sort({ _id: -1 }) //-1 for desc
      .skip(0)
      .limit(5)
      .then(users => {
        console.log("Users: ", users);
        assert(users.length === 5);
        done();
      });
  });
});
