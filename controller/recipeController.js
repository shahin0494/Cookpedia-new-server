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

// add recipe
exports.addRecipeController = async (req, res) => {
    console.log("inside addRecipeController");
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing } = req.body
    try {
        const existingRecipeDetails = await recipes.findOne({ name })
        if (existingRecipeDetails) {
            res.status(409).json("Recipe already exists ")
        } else {
            const newRecipes = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            })
            await newRecipes.save()
            res.status(200).json(newRecipes)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete recipe
exports.removeRecipeController = async (req, res) => {
    console.log("inside removeRecipeController");
    const { id } = req.params
    try {
        const removeItemDetails = await recipes.findByIdAndDelete({ _id: id })
        res.status(200).json(removeItemDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update recipe
exports.updateRecipeController = async (req, res) => {
    console.log("inside updateRecipeController");
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing } = req.body
    const { id } = req.params
    try {
        const updateRecipeDetails = await recipes.findByIdAndUpdate({ _id: id }, {
            name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing
        }, { new: true })
        await updateRecipeDetails.save()
        res.status(200).json(updateRecipeDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}