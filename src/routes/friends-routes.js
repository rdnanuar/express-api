const express = require("express")
const {listData} = require("../controllers/friends")

const router = express.Router()

router.get("/friends", listData.getFriendsData)
router.get("/friends/:id", listData.getFriendsWithId)
router.post("/friends", listData.createFriends)
router.put("/friends/:id", listData.updateFriend)
router.delete("/friends/:id", listData.deleteFriend)


module.exports = {router}