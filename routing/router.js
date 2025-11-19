const express = require("express")
const recipeController = require("../controller/recipeController")

const routes = express.Router()

// get all recipes
routes.get("/all-recipes",recipeController.getAllRecipeController)

module.exports = routes