const friends = require("../models/friends.json")
const {writeDataToFile} = require("../utils")
const {v4 : uuid} = require("uuid")


const listData = {

    /**
     * @desc get all data from firends 
     */

    async getFriendsData(req, res) {
        await res.status(200).json({
        results : {
            succes : true,
            lengthData : friends.length,
            data : friends
        }
    })
    },

    /**
     * 
     * @param {req} request to express param 
     * @param {res} response to client
     * @returns {friendId} return one friend with selected ID
     */

    async getFriendWithId(req, res) {
        const friendId = friends.find(({id}) => id === req.params.id)

        return friendId ? await res.status(200).json({data : [friendId]}) : res.status(404).json({message : `friend with id ${req.params.id} not found`})
    },

    /**
     * 
     * @param {req} request to express body json 
     * @param {res} response to client with data has been created
     */

    async createFriends(req, res) {
        if(!req.body.name) {
            await res.status(400).json({
                message : "Missing friend name"
            })
        }else {
            const newFriend = {
                id : uuid(),
                name : req.body.name,

            }
            friends.push(newFriend)
            writeDataToFile("models/friends.json", friends)
            await res.status(201).json({
                data : newFriend
            })
        }
    },

    /**
     * 
     * @param {req} request body name and params id from express
     * @param {res} response to client with data has been updated
     */

    async updateFriend(req, res) {
        const friendId = friends.findIndex(p => p.id === req.params.id)
        
        const updateFriend = {
            id : req.params.id,
            name : req.body.name
        }
        friends[friendId] = {...updateFriend}
        writeDataToFile("models/friends.json", friends)
        await res.status(200).json({
            data : updateFriend
        })
    },

    /**
     * 
     * @param {req} request params id from express 
     * @param {res} respsonse to client with message data has been deleted 
     */

    async deleteFriend(req, res) {
        const friendId = friends.filter(p => p.id !== req.params.id)
        
        if(friendId) {
            writeDataToFile("models/friends.json", friendId)
            await res.status(200).json({
                message : `friends with id ${req.params.id} has been deleted`
            })
        }
    }
}

module.exports = {listData}