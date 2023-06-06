const express = require("express")
const router = express.Router()
// const {authToken} = require("../middleware/authToken")
// const {authorizeRole} = require('../middleware/roleAutorhize')
const userController = require("../controllers/autentikasi")
router.post('/register', userController.registration)
router.post('/login', userController.login)

router.get('/logout', userController.logoutUser)

module.exports = router