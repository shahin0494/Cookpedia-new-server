const mongoose = require("mongoose")
const connectionString = process.env.DBCONNECTION

mongoose.connect(connectionString).then(res => {
    console.log("mongodb connected successfull");
}).catch(err => {
    console.log("mongodb connectin failed");
    console.log(err);
})