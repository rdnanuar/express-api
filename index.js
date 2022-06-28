const express = require("express")
const write = require("./utils")
const app = express()
const {v4 : uuid} = require("uuid")
const friends = require("./data/friends.json")
const { response } = require("express")

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
    const start = Date.now();
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${ req.url} ${delta}ms`)
})

app.use(express.json())

app.post('/friends', (req, res) => {
    const newFriend = {
        id : uuid(),
        name : req.body.name,

    }
    friends.push(newFriend)
    write("./data/friends.json", friends)
    res.status(201).json({
        data : newFriend
    })
})

app.delete("/friends/:id", (req, res) => {
    const friendId = friends.find(({id}) => id === String(req.params.id))
    if(!friendId) {
        res.status(404).json({
            message : `Data with id ${req.params.id} not found`
        })
    }else {
        friends.splice(friendId, 1)
        write("./data/friends.json", friends)
        res.status(200).json({
            message : `Data with id ${req.params.id} has been deleted`
        })
    }
})

app.get("/friends", (req, res) => {
    res.status(200).json({
        data : friends
    })
})

app.get("/friends/:id", (req, res) => {
    
    const friendId = friends.find(({id}) => id === Number(req.params.id))

    return friendId ?  res.status(200).json({data : [friendId]}) : res.status(404).json({message : `friend with id ${req.params.id} not found`})
})

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT} ....`)
})  