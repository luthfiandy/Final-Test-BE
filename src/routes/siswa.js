const express = require("express")
const router = express.Router()
// const {authToken} = require("../middleware/authToken")
// const {authorizeRole} = require('../middleware/roleAutorhize')
const siswaController = require("../controllers/siswa")
// router.post('/registration', siswaController.registration)
// router.post('/', data_siswaController.postata_siswa)
router.get('/', siswaController.getAllSiswa)
// router.post('/',upload.single("file"), siswaController.postsiswa)
router.get('/delete/:id', siswaController.deletesiswa)

// router.get('/', authToken, authorizeRole, siswaController.getAllsiswa)
router.get('/edit/:id', siswaController.getSiswaById)
router.post('/update/:id', siswaController.updateSiswa)

module.exports = router