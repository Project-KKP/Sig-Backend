const router = require('express').Router();
const {getData}= require('../controllers/dataController');

router.get('/data', getData);

module.exports = router;