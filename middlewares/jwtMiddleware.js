const jwt = require("jsonwebtoken")

const jwtMiddleWare = (req, res, next) => {
    console.log("jwtMiddleWare");
    const token = req.headers["authorization"].split(" ")[1]
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            req.role = jwtResponse.role
            req.payload = jwtResponse.email
            next()
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(404).json("Authorisation Failed! Token Missing!")
    }
}

module.exports = jwtMiddleWare