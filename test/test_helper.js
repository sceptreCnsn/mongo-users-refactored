const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(
    "mongodb://localhost/users_test",
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once("open", () => {
      console.log("Connected to db.");
      done();
    })
    .on("error", error => {
      console.warn("Error: ", error);
    });
});

// beforeEach(done => {
//     const { users, comments, blogposts } = mongoose.connection.collections;
//     users.drop(() => {
//       Promise.resolve();
//       comments.drop(() => {
//         Promise.resolve();
//         blogposts.drop(() => {
//           Promise.resolve();
//         });
//       });
//     });
//     done();
//   });
  