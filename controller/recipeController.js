const recipes = require("../model/recipeModel")



// get all recipe
exports.getAllRecipeController = async (req, res) => {
    console.log("inside getAllRecipeController");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get single recipe
exports.viewRecipeController = async (req, res) => {
    console.log("inside view RecipeController");
    const { id } = req.params
    try {
        const viewDetails = await recipes.findById({ _id: id })
        res.status(200).json(viewDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}

// related recipe
exports.getRelatedRecipeController = async (req, res) => {
    console.log("inside related RecipeController");
    const cuisine = req.query.cuisine
    // console.log(cuisine);
    
    try {
        const allRecipeDetails = await recipes.find({ cuisine })
        // console.log(allRecipeDetails);
        
        res.status(200).json(allRecipeDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}
