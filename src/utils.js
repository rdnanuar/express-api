const fs = require("node:fs")

const writeDataToFile = (filename ,content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if(err) throw err
    })
}

module.exports = {writeDataToFile}