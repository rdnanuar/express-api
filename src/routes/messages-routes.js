const {getMessages, postMessage} = require("../controllers/messages.controller")
const routerMessage = require("express").Router()

routerMessage.get("/messages", getMessages)
routerMessage.post("/messages", postMessage)

module.exports = {routerMessage}
