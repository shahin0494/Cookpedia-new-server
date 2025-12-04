const express = require("express")
const recipeController = require("../controller/recipeController")
const userController = require("../controller/userController")
const jwtMiddleWare = require("../middlewares/jwtMiddleware")
const downloadController = require("../controller/downloadController")
const saveController = require("../controller/saveRecipeController")
const feedbackController=require("../controller/feedbackController")
const adminJwtMiddleWare = require("../middlewares/adminMiddleware")

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

// delete save recipe
routes.delete('/recipes/:id/delete', jwtMiddleWare, saveController.deleteSavedRecipeController)

// get user download recipe

// edit user profile

// add feedback
routes.post("/user/feedback",feedbackController.addFeedbackController)

// get all feedbacks - all users
routes.get('/user/feedbacks/approved',feedbackController.getfeedbackApprovedListController)

// admin

// get all users - admin
routes.get('/users',adminJwtMiddleWare,userController.getAllUsersController)

// get all downloads - admin
routes.get('/downloads',jwtMiddleWare,downloadController.getDownloadListController)

// get all feedbacks - admin
routes.get('/feedbacks',adminJwtMiddleWare,feedbackController.getFeedbackListController)

// change feedbacks status - admin
routes.put('/feedbacks/:id/edit',adminJwtMiddleWare,feedbackController.updateFeedbackStatusController)

// add recipe
routes.post('/recipe/add',adminJwtMiddleWare,recipeController.addRecipeController)

// delete recipe
routes.delete('/recipe/:id',adminJwtMiddleWare,recipeController.removeRecipeController)

// edit recipe - admin
routes.put('/recipe/:id',adminJwtMiddleWare,recipeController.updateRecipeController)


module.exports = routes