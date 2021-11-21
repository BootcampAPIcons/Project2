const {Post} = require('../models');

const postData = [
  {
    title: "My first post!",
    // post_url: "post/1",
    user_id: 1
  },
  {
    title: "MY first post",
    // post_url: "post/2",
    user_id: 2
  },
  {
    title: "My second post",
    // post_url: "post/3",
    user_id: 2
  },
  {
    title: "late to the party! (first post)",
    // post_url: "post/4",
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
