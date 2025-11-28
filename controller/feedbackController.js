const feedbacks = require("../model/feedbackModel")

// add to feedback
exports.addFeedbackController = async (req, res) => {
    console.log("inside addFeedbackController");
    const { name, email, message } = req.body
    console.log(req.body);
    
    try {
        const newFeedback = new feedbacks({
            name, email, message
        })
        console.log(newFeedback);
        
        await newFeedback.save()
        res.status(200).json("Thank You for your Feedback ❤️ We appreciate your efforts ☺️")
    } catch (error) {
        res.status(500).json(error)
    }
}