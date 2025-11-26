const express = require("express")
const recipeController = require("../controller/recipeController")
const userController = require("../controller/userController")
const jwtMiddleWare = require("../middlewares/jwtMiddleware")
const downloadController = require("../controller/downloadController")
const saveController = require("../controller/saveRecipeController")

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

// save recipe
routes.post('/recipes/:id/save', jwtMiddleWare, saveController.addToCollectionController)

// get save recipe
routes.get('/recipes/saved', jwtMiddleWare, saveController.getSavedRecipesController)

// get save recipe
routes.delete('/recipes/:id/delete', jwtMiddleWare, saveController.deleteSavedRecipeController)

module.exports = routes