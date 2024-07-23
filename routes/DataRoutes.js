const router = require('express').Router();
const { createLocation } = require('../controllers/createController');
const { deleteLocation } = require('../controllers/deleteController');
const { updateLocation } = require('../controllers/updateController');
const { getData } = require('../controllers/dataController');
const { getReport, reportUser } = require('../controllers/reportController')
const { loginUser, editUser } = require('../controllers/loginController');
const { registerUser } = require('../controllers/registerController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { createBlank } = require('../controllers/createblank');
const { deleteBlank } = require('../controllers/deleteblank');
const { updateBlank } = require('../controllers/updateblank');
const { getBlank } = require('../controllers/getblank')

// Public routes
router.get('/towers', getData);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/report', [verifyToken, isAdmin], getReport)

// Protected routes for admin
router.post('/towers', [verifyToken, isAdmin], createLocation);
router.put('/towers/:id', [verifyToken, isAdmin], updateLocation);
router.delete('/towers/:id', [verifyToken, isAdmin], deleteLocation);
router.put('/edituser', verifyToken, editUser);


//create blank
router.post('/blankspots', [verifyToken, isAdmin], createBlank);
router.delete('/blankspots/:id', [verifyToken, isAdmin], deleteBlank);
router.put('/blankspots/:id', [verifyToken, isAdmin], updateBlank);
router.get('/blankspots', getBlank);

module.exports = router;
