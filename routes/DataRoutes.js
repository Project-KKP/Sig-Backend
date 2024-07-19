const router = require('express').Router();
const { createLocation } = require('../controllers/createController');
const { deleteLocation } = require('../controllers/deleteController');
const { updateLocation } = require('../controllers/updateController');
const { getData } = require('../controllers/dataController');
const { loginUser, editUser } = require('../controllers/loginController');
const { registerUser } = require('../controllers/registerController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/data', getData);
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected routes for admin
router.post('/create', [verifyToken, isAdmin], createLocation);
router.put('/update/:id', [verifyToken, isAdmin], updateLocation);
router.delete('/delete/:id', [verifyToken, isAdmin], deleteLocation);
router.put('/edituser', verifyToken, editUser);

module.exports = router;
