const router = require('express').Router();
const apiRoutes = require('./apiRoutes')
const htmlRoutes = require('./htmlRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;