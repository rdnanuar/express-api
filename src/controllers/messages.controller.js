const path = require("path")
function getMessages(req, res) {
    res.render("messages", {
        tittle : "Messages to my Friends!",
        friend : "Elonk Musk"
    })
    // res.sendFile(path.join(__dirname, "..",'public', "images", "pesut.jpg"))
}

function postMessage(req, res) {
    console.log("Updating messages...")
}

module.exports = {getMessages, postMessage}