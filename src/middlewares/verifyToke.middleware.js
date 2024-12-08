const jwt = require("jsonwebtoken")
const fs = require("fs")

const verifToken = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return res.status(403).json({message: "Accès refusé"})
    } else {
        const secret = fs.readFileSync("./.meow/meowPb.pem")
        jwt.verify(token, secret, (err, decode) => {
            if(err) {
                return res.status(401).json({message: "Token invalid"})
            } else {
                req.authData = decode
                next()
            }
        })
    }
}

module.exports = verifToken