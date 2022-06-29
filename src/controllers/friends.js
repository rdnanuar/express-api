const friends = require("../../data/friends.json")
const {writeDataToFile} = require("../../utils")
const {v4 : uuid} = require("uuid")


const listData = {

    getFriendsData(req, res) {
        res.status(200).json({
        data : friends
    })
    },
    getFriendsWithId(req, res) {
    const friendId = friends.find(({id}) => id === req.params.id)

    return friendId ?  res.status(200).json({data : [friendId]}) : res.status(404).json({message : `friend with id ${req.params.id} not found`})
    },
    createFriends(req, res) {
        const newFriend = {
            id : uuid(),
            name : req.body.name,

        }
        friends.push(newFriend)
        writeDataToFile("./data/friends.json", friends)
        res.status(201).json({
            data : newFriend
        })
    },
    updateFriend(req, res) {
        const friendId = friends.findIndex(p => p.id === req.params.id)
        
        const updateFriend = {
            id : req.params.id,
            name : req.body.name
        }
        friends[friendId] = {...updateFriend}
        writeDataToFile("./data/friends.json", friends)
        res.status(200).json({
            data : updateFriend
        })
    },
    deleteFriend(req, res) {
    const friendId = friends.filter(p => p.id !== req.params.id)
    
    if(friendId) {
        writeDataToFile("./data/friends.json", friendId)
        res.status(200).json({
            message : `friends with id ${req.params.id} has been deleted`
        })
    }
    }
}

module.exports = {listData}