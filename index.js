const express = require("express")
const {router} = require("./src/routes/friends-routes")

const app = express()

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
    const start = Date.now();
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${ req.url} ${delta}ms`)
})

app.use(express.json())

app.use("/", router)

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT} ....`)
})  