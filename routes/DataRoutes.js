const router = require('express').Router();
const {getData}= require('../controllers/dataController');
const {loginUser}= require('../controllers/loginController');
const { registerUser } = require('../controllers/registerController');

router.get('/data', getData);
router.post('/login', loginUser);
router.post('/register', registerUser) 

module.exports = router;