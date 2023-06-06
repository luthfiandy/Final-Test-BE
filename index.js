const express = require('express')
const app = express()
const port = 3050
app.use(express.json())
require("dotenv").config()
const bodyParser = require("body-parser")
const { siswa } = require('./models')
const cookieParser = require('cookie-parser')
const siswaRoutes = require('./src/routes/siswa')
const authRoutes = require('./src/routes/autentikasi')

app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.get('/', (req,res) =>{
  res.render('index',{})
})

app.use('/siswa', siswaRoutes, (req,res) => {
  res.render('edit',{})
})
app.use('/auth', authRoutes, (req,res) =>{
  res.render('mainpage',{})
} )

app.set("view engine", "ejs")

app.listen(port, () =>{
    console.log(`Examle app in port ${port}`)
})