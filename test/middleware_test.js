const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middleware", () => {
  let joe, blogPost;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "Js is Great",
      content: "blogPOst content"
    });
    joe.blogPosts.push(blogPost);
    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("users clean up blogposts on remove using pre middleware", done => {
    joe.remove().then(() => BlogPost.countDocuments())
    .then((count)=>{
        console.log(count);
        done();
    }).catch(err=>{
        console.log('Error: ',err);
    });
  });
});
