const express = require("express")
const recipeController = require("../controller/recipeController")
const userController = require("../controller/userController")
const jwtMiddleWare = require("../middlewares/jwtMiddleware")
const downloadController = require("../controller/downloadController")

const routes = express.Router()

// get all recipes
routes.get("/all-recipes", recipeController.getAllRecipeController)

// register user
routes.post("/register", userController.registerController)

// login user
routes.post("/login", userController.loginController)

// view single recipes
routes.get("/recipe/:id/view", jwtMiddleWare, recipeController.viewRecipeController)

// related recipe
routes.get("/related-recipes", jwtMiddleWare, recipeController.getRelatedRecipeController)

//add to download
routes.put("/recipe/:id/download", jwtMiddleWare, downloadController.addToDownloadController)

module.exports = routes