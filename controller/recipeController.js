const recipes = require("../model/recipeModel")



// get all recipe
exports.getAllRecipeController = async (req,res)=>{
    console.log("inside getAllRecipeController");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}