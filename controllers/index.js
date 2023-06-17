const userRoutes = require('./userRoute');
const thoughtRoute = require('./thoughtRoute');
const router = require('express').Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoute);

module.exports = router;