exports.authorizeRole = (req, res, next) => {
    const roleAllowed = ['admin', ]
    let allowedBoolean = false

    roleAllowed.map((item) => {
        if (req.user.role == item) {
            allowedBoolean = true
        }
    })

    if (allowedBoolean) {
        return next()
    } else {
        return res.status(403).send({
            status: 403,
            message: 'forbidden acces'
        })
    }
}