const downloads = require("../model/downloadModel")

// add to download
exports.addToDownloadController = async (req, res) => {
    console.log("inside addToDownloadController");

    // recipe id
    const { id } = req.params
    // user mail
    const userMail = req.payload
    // recipe name,cuisine,image
    const { name, cuisine, image } = req.body
    try {
        const existingRecipe = await downloads.findOne({ recipeId: id })
        if (existingRecipe) {
            // update count
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        } else {
            // add recipe to download list
            const newDownload = new downloads({
                recipeId: id, recipeName: name, recipeImage: image, recipeCuisine: cuisine, count: 1, userMail
            })
            await newDownload.save()
            res.status(200).json(newDownload)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}