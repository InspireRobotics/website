const fs = require("fs")
const path = require("path")
const {ncp} = require("ncp")
const del = require("del")

function injectTemplates(filename) {
    let html = fs.readFileSync(filename).toString()
    html = html.replace(/{{{.*}}}/g, (match, x, y) => {
        return fs.readFileSync(`templates/${match.replace(/[{}]/g, "")}`).toString()
    })
    fs.writeFileSync(filename, html)
    console.log("---parsed ", filename)

}

function fromDir(startPath, filter) {
    let htmlFiles = []
    const files = fs.readdirSync(startPath)
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const filename = path.join(startPath, file)
        const stat = fs.lstatSync(filename)
        if (stat.isDirectory()) {
            fromDir(filename, filter)
        } else if (filename.indexOf(filter) >= 0) {
            htmlFiles.push(filename)
        }
    }
    return htmlFiles
}

// Delete out the previous build
del.sync(["docs/*"])

// Copy all of the files from the src directory to the docs directory
ncp("./src", "./docs", () => {
    const htmlFiles = fromDir("./docs", ".html")
    htmlFiles.forEach(file => {
        injectTemplates(file)
    })
})
