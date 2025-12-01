const saveRecipes = require("../model/saveRecipeModel")

// add to collection
exports.addToCollectionController = async (req, res) => {
    console.log("inside addToCollectionController");
    // get id,mail,name,img
    const { name, image } = req.body
    const { id } = req.params
    const userMail = req.payload
    try {
        const saveRecipe = await saveRecipes.findOne({ recipeId: id, userMail })
        if (saveRecipe) {
            res.status(401).json("Recipe already saved into your collection 😉")
        }
        else {
            const newSave = new saveRecipes({
                recipeId: id, recipeName: name, recipeImage: image, userMail
            })
            await newSave.save()
            res.status(200).json(newSave)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all saved recipes of a user
exports.getSavedRecipesController = async (req, res) => {
    console.log("inside getSavedRecipesController");
    const userMail = req.payload
    try {
        const allSavedRecipes = await saveRecipes.find({ userMail })
        res.status(200).json(allSavedRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete saved recipe
exports.deleteSavedRecipeController = async (req, res) => {
    console.log("inside delete save recipe");
    const { id } = req.params
    try {
        const deleteRecipe = await saveRecipes.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
}