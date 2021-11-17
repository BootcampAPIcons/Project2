const {Comment} = require('../models');

const commentData = [
  {
    comment_text: "commenting is fun",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "I never knew you could comment!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "Trying this out",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: "Hello world",
    user_id: 3,
    post_id: 4,
  },
  {
    comment_text: "posting and commenting like a real site!",
    user_id: 1,
    post_id: 3,
  },
  {
    comment_text: "How are you doing?",
    user_id: 2,
    post_id: 4,
  },
  {
    comment_text: "another comment",
    user_id: 3,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
