const router = require('express').Router();
const { createLocation, deleteLocation, updateLocation, getData  } = require('../controllers/towersController');
const { getReport, createReport, getReportLength , createKritik, getKritik} = require('../controllers/reportController')
const { loginUser, editUser, registerUser } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { createBlank, deleteBlank, updateBlank, getBlank } = require('../controllers/blanksController');

// Public routes
router.get('/towers', getData);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/reportlength', getReportLength);
router.post('/kritik', createKritik);
router.put('/edituser', verifyToken, editUser);
router.post('/report', createReport);


// Protected routes for admin
router.post('/towers', [verifyToken, isAdmin], createLocation);
router.put('/towers/:id', [verifyToken, isAdmin], updateLocation);
router.delete('/towers/:id', [verifyToken, isAdmin], deleteLocation);
router.get('/report', [verifyToken, isAdmin], getReport)


//create blank
router.post('/blankspots', [verifyToken, isAdmin], createBlank);
router.delete('/blankspots/:id', [verifyToken, isAdmin], deleteBlank);
router.put('/blankspots/:id', [verifyToken, isAdmin], updateBlank);
router.get('/blankspots', getBlank);

//get kritik for admin
router.get('/kritik',verifyToken, isAdmin, getKritik);

module.exports = router;
