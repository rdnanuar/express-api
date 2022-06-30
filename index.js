const express = require("express")
const {routerFriends} = require("./src/routes/friends-routes")
const {routerMessage} = require("./src/routes/messages-routes")

const app = express()

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
    const start = Date.now();
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${ req.url} ${delta}ms`)
})

app.use(express.json())

app.use("/api", routerFriends, routerMessage)

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT} ....`)
})  