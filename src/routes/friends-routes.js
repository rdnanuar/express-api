const {listData} = require("../controllers/friends.controller")
const routerFriends = require("express").Router()

routerFriends.get("/friends", listData.getFriendsData)
routerFriends.get("/friends/:id", listData.getFriendWithId)
routerFriends.post("/friends", listData.createFriends)
routerFriends.put("/friends/:id", listData.updateFriend)
routerFriends.delete("/friends/:id", listData.deleteFriend)


module.exports = {routerFriends}