const jwt = require('jsonwebtoken')
const {siswa} = require('../../models')
const { object } = require('joi')

exports.authToken = async (req, res, next) => {
    try{
        // const header = req.headers['authorization']
        // console.log(header)
        // const token = header && header.split(' ')[1]
        // if(!header){
        //     return res.send({
        //         status:401,
        //         message: 'Unauthorize'
        //     })
        // }
        const cookie = req.cookies;
        const token = cookie && cookie.token;

        if (!cookie || Object.keys(cookie).length == 0 || cookie == null) {
            return res.send({
                status: 401,
                message: "Unautozrizhed" ,
            });
        }

        const userVerifiedId = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
            if(err){
                return res.send({
                    message: err.message
                })
            }
            console.log(user)
            return user.id
        })

        const userVerified = await siswa.findOne({
            where: {
                id: userVerifiedId
            },
            attributes: {
                exclude: ['cretadAt', 'updatedAt']
            }
        })

        req.user = userVerified.dataValues
        next()
    }catch (err){
        console.error(err)
    }
}