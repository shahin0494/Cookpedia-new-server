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

// get all feedback list
exports.getFeedbackListController = async (req, res) => {
    console.log("inside getFeedbackListController ");
    try {
        const allfeedbacks = await feedbacks.find()
        res.status(200).json(allfeedbacks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update feedback controller
exports.updateFeedbackStatusController = async (req, res) => {
    console.log("inside updateFeedbackController");
    const { id } = req.params
    const status = req.query.status
    try {
        const exisitnFeedback = await feedbacks.findById({ _id: id })
        exisitnFeedback.status = status
        await exisitnFeedback.save()
        res.status(200).json(exisitnFeedback)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get feedback approved controller
exports.getfeedbackApprovedListController = async (req, res) => {
    console.log("inside getfeedbackApprovedListController");
    try {
        const approvedFeedback = await feedbacks.find({ status: 'approved' });
        res.status(200).json(approvedFeedback)
    } catch (error) {
        res.status(500).json(error)
    }
}