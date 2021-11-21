const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
const encounterRoutes = require('./encounter-routes');
const router = require('express').Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/encounter', encounterRoutes);

module.exports = router;