const {Post} = require('../models');

const postData = [
  {
    title: "My first post!",
    post_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet cursus faucibus. In interdum nulla gravida lacus pharetra, at egestas.",
    user_id: 1
  },
  {
    title: "MY first post",
    post_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet cursus faucibus. In interdum nulla gravida lacus pharetra, at egestas.",
    user_id: 2
  },
  {
    title: "My second post",
    post_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet cursus faucibus. In interdum nulla gravida lacus pharetra, at egestas.",
    user_id: 2
  },
  {
    title: "late to the party! (first post)",
    post_body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet cursus faucibus. In interdum nulla gravida lacus pharetra, at egestas.",
    user_id: 3
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
