const express = require("express")
const {listData} = require("../controllers/friends.controller")
const {getMessages, postMessage} = require("../controllers/messages.controller")

const router = express.Router()

router.get("/friends", listData.getFriendsData)
router.get("/friends/:id", listData.getFriendWithId)
router.get("/messages", getMessages)
router.post("/messages", postMessage)
router.post("/friends", listData.createFriends)
router.put("/friends/:id", listData.updateFriend)
router.delete("/friends/:id", listData.deleteFriend)


module.exports = {router}