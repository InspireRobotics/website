const fs = require("fs")
const path = require("path")
const {ncp} = require("ncp")
const del = require("del")

function injectTemplates(filename) {
    let html = fs.readFileSync(filename).toString();

    //Inject templates
    html = html.replace(/{{{.*}}}/g, (match, x, y) => {
        return fs.readFileSync(`templates/${match.replace(/[{}]/g, "")}`).toString()
    })

    let photoItemSrc = fs.readFileSync("templates/photoitem.html").toString();

    //Inject images
    html = html.replace(/{img}(.|\n|\r)*?{img}/g, (match, x, y) => {
        match = match.replace("{img}", "{");
        match = match.replace("{img}", "}");

        json = JSON.parse(match);

        output = photoItemSrc.replace("[IMG_SRC]", json.src);
        output = output.replace("[IMG_SRC]", json.src);
        output = output.replace("[CAPTION]", json.caption);
        output = output.replace("[SIZE]", json.size);
        output = output.replace("[DIV_ATTRS]", json.div_attr == undefined ? "": json.div_attr);
        output = output.replace("[IMG_ATTRS]", json.img_attr == undefined ? "": json.img_attr);

        return output
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
