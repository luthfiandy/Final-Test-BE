const { siswa } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { logger } = require('../middleware/logger');

exports.getAllSiswa = async (req, res) => {
    try {
        const siswaLogin = req.body
        console.log(siswaLogin);
        const data = await siswa.findAll({
            attributes: {
                exclude: ["password"]
            }
        });

        res.render("edit", {
            data: data
        })

    } catch (err) {
        logger.error(err.message)
        console.error(err);
        res.status(500).send({
            status: 500,
            message: 'Something Happened!'
        })
    }
}


exports.getSiswaById = async (req, res) => {
    try {
      const id = req.params.id;

    const data = await siswa.findOne({
        where:{
            id: id
        },
        attributes : {
            exclude : ["createdAt", "updateAt"]
        }
    })

    res.render("edit", {
        data:data
    })

    } catch (error) {
      logger.error(error.message);
      console.log(error);
      return res.send({
        status: 500,
        message: "Internal server error!",
      });
    }
  };

exports.postSiswa = async (req, res) => {
    try {
        const body = req.body
        const data = await siswa.create({
            email: body.email,
            password: body.password
        })
        res.redirect("/siswa/users")

    } catch (error) {
        console.log(error)
        return res.send({
            status: 500,
            message: 'Internal server error'
        })
    }
}


exports.updateSiswa = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const findSiswa = await siswa.findOne({
            where:{
                id:id
            },
            attributes :{
                exclude: ["createdAt", "updatedAt"]
            }
        })

        await findSiswa.update({
            name_siswa: body.name_siswa,
            role: body.role,
            username: body.username,
            email: body.email,
            password: body.password,
        })

        res.redirect("/siswa/users")
    } catch (error) {
        console.log(error);
        return res.status (500).send({
            massage: " internal server error"
        })
    }
}

exports.deletesiswa = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id

        const siswaData = await siswa.findOne({
            where: {
                id: id
            }
        })

        const data = await siswaData.destroy()
        res.redirect("/siswa/users")
        
    } catch (error) {
        console.log(error)
        return res.send({
            status: 500,
            message: 'Internal server error'
        })
    }
}

