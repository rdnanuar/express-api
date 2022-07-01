const express = require("express")
const {routerFriends} = require("./src/routes/friends-routes")
const {routerMessage} = require("./src/routes/messages-routes")
const path = require("path")

const app = express()

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src/views"))

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
    const start = Date.now();
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${req.baseUrl}${ req.url} ${delta}ms`)
})

app.use('/index', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get("/", (req,res) => {
    res.render("index.hbs", {
        tittle : "Temen Bangsat",
        caption : "anjay"
    })
})
app.use("/api", routerFriends, routerMessage)

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT} ....`)
})  