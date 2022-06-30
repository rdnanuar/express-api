const friends = require("../../models/friends.json")
const {writeDataToFile} = require("../utils")
const {v4 : uuid} = require("uuid")


const listData = {

    /**
     * @desc get all data from firends 
     */

    getFriendsData(req, res) {
        res.status(200).json({
        data : friends
    })
    },

    /**
     * 
     * @param {req} request to express param 
     * @param {res} response to client
     * @returns {friendId} return one friend with selected ID
     */

    getFriendWithId(req, res) {
        const friendId = friends.find(({id}) => id === req.params.id)

        return friendId ?  res.status(200).json({data : [friendId]}) : res.status(404).json({message : `friend with id ${req.params.id} not found`})
    },

    /**
     * 
     * @param {req} request to express body json 
     * @param {res} response to client with data has been created
     */

    createFriends(req, res) {
        if(!req.body.name) {
            res.status(400).json({
                message : "Missing friend name"
            })
        }else {
            const newFriend = {
                id : uuid(),
                name : req.body.name,

            }
            friends.push(newFriend)
            writeDataToFile("./models/friends.json", friends)
            res.status(201).json({
                data : newFriend
            })
        }
    },

    /**
     * 
     * @param {req} request body name and params id from express
     * @param {res} response to client with data has been updated
     */

    updateFriend(req, res) {
        const friendId = friends.findIndex(p => p.id === req.params.id)
        
        const updateFriend = {
            id : req.params.id,
            name : req.body.name
        }
        friends[friendId] = {...updateFriend}
        writeDataToFile("./models/friends.json", friends)
        res.status(200).json({
            data : updateFriend
        })
    },

    /**
     * 
     * @param {req} request params id from express 
     * @param {res} respsonse to client with message data has been deleted 
     */

    deleteFriend(req, res) {
        const friendId = friends.filter(p => p.id !== req.params.id)
        
        if(friendId) {
            writeDataToFile("./models/friends.json", friendId)
            res.status(200).json({
                message : `friends with id ${req.params.id} has been deleted`
            })
        }
    }
}

module.exports = {listData}