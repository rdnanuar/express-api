const fs = require("node:fs")
const path = require("node:path")

const writeDataToFile = (filename ,content) => {
    fs.writeFileSync(path.join(__dirname , filename), JSON.stringify(content), 'utf-8', (err) => {
        if(err) throw err
    })
}

module.exports = {writeDataToFile}