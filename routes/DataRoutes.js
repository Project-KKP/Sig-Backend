const router = require('express').Router();
const { createLocation } = require('../controllers/createController');
const { deleteLocation } = require('../controllers/deleteController');
const { updateLocation } = require('../controllers/updateController')
const {getData}= require('../controllers/dataController');
const {loginUser, editUser}= require('../controllers/loginController');
const { registerUser } = require('../controllers/registerController');
const {userController} = require('../controllers/userController');
const {adminCheck} = require('../middleware/adminCheck');
const {isAuthorized} = require('../middleware/auth');
const {loginAdmin} = require('../controllers/loginadminController')



router.get('/data', getData,adminCheck,isAuthorized);
router.post('/login', loginUser,adminCheck,isAuthorized);
router.post('/loginadmin', loginAdmin);
router.post('/register', registerUser,adminCheck,isAuthorized)
router.post('/createlocation', createLocation,adminCheck,isAuthorized)
router.delete('/deletelocation', deleteLocation,adminCheck,isAuthorized)
router.put('/updatelocation', updateLocation,adminCheck,isAuthorized)
router.put('/edituser', editUser)
module.exports = router;