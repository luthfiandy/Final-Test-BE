const { siswa } = require("../../models");
const { user } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { logger } = require('../middleware/logger');

exports.login = async (req, res) => {
    try {
        const body = req.body

        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(3).required()
        })

        const { error } = schema.validate(body)

        if (error) {
            console.log(error)
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        let datasiswa = await siswa.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!datasiswa) {
            return res.status(400).send({
                message: 'Email doesnt match'
            })
        }

        const match = await bcrypt.compare(body.password, datasiswa.password)
        if (!match) {
            return res.status(400).send({
                message: 'password doesnt match'
            })
        }

        let datasiswalast = await siswa.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        })

        const accessToken = jwt.sign({
            id: datasiswalast.id
        },
            process.env.ACCESS_SECRET_TOKEN
        )

        res.cookie("token", accessToken);
        res.redirect("/siswa");

        // res.status(200).send({
        //     message: 'berhasil login',
        //     data: dataUserlast,
        //     token: accessToken
        // })
    } catch (err) {
        console.error(err)
    }
}

exports.registration = async (req, res) => {
    try {
        const body = req.body;
        const hashedpassword = await bcrypt.hash(req.body.password, 10);

        // const data = {
        //     nama: body.nama,
        //     tanggal_Lahir:body.tanggal_Lahir,
        //     tempat_Lahir:body.tempat_Lahir,
        //     kelas: body.kelas,
        //     alamat: body.alamat,
        //     no_Hp: body.no_Hp,
        //     nama_Ortu: body.nama_Ortu,
        //     no_Hp_Ortu: body.no_Hp_Ortu,
        //     email: body.email,
        //     password: hashedpassword
        // }

        const schema = joi.object({
            nama: joi.string().min(3).required(),
            tanggal_Lahir: joi.string().min(3).required(),
            tempat_Lahir: joi.string().min(3).required(),
            kelas: joi.string().min(3).required(),
            alamat: joi.string().min(3).required(),
            no_Hp: joi.string().min(8).required(),
            nama_Ortu: joi.string().min(3).required(),
            no_Hp_Ortu: joi.string().min(8).required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        const addSiswa = await siswa.create({
            nama: body.nama,
            tanggal_Lahir:body.tanggal_Lahir,
            tempat_Lahir:body.tempat_Lahir,
            kelas: body.kelas,
            alamat: body.alamat,
            no_Hp: body.no_Hp,
            nama_Ortu: body.nama_Ortu,
            no_Hp_Ortu: body.no_Hp_Ortu,
            email: body.email,
            password: hashedpassword,
        })

        res.redirect('/')
        res.status(200).send({
            massage: "Disimpan",
            data: addUser
        })
    } catch (err) {
        console.error(err);
    }
}


exports.logoutUser = async (req, res) => {
    console.log(req.cookies);
    res.clearCookie("token");
    res.redirect('/User')
}