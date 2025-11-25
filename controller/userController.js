const users = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// register
exports.registerController = async (req, res) => {
    console.log("inside registerController");
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("user already exists ")
        } else {
            const encryptPSWD = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptPSWD, profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("loginController");
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            let isUserLoggedIn = existingUser.role == "user" ? await bcrypt.compare(password, existingUser.password) : password == existingUser.password
            if (isUserLoggedIn) {
                const token = jwt.sign({ email, role: existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(404).json("Invalid Username/Password")
            }
        } else {
            res.status(404).json("Invalid Email Please proceed to registration")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}