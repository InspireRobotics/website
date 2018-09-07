const express = require("express")
const http = require("http")
const path = require("path")
const watch = require("node-watch")
const {exec} = require("child_process")
const opn = require("opn")

function rebuildProject() {
    // Call the build script
    exec("node build")
}

// Rebuild project a first time to make sure everything is build
rebuildProject()
// Watch the src for changes to update the project
watch("src", {recursive: true}, rebuildProject)
// Also watch the templates so the reload includes these as well
watch("templates", {recursive: true}, rebuildProject)

// Build the express server to allow for static file serving
const app = express()

// Mark the public folder as the build directory
const publicDir = path.join(__dirname, "build")

// The server should run on port 3000
const PORT = process.env.PORT || 3000

// If the root web page is requested, serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"))
})

// For everything else, serve the public "build" folder defined above
app.use(express.static(publicDir))

const server = http.createServer(app)

server.listen(PORT, function () {
    console.log("Development server listening on port " + PORT)
    opn("http://localhost:" + PORT)
})

