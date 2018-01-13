
var frame;
var picName;
var imgNames;
var imgSrcs;
var currentImg = 0;

function init() {
    frame = document.getElementById("frame");
    picName = document.getElementById("pic-name");

    getFile("pictures/pictures.txt");
}

function parseImgFile(request) {
    imgSrcs = [];
    imgNames = [];

    request.response.split("\n").forEach(function (item, index, array) {
        if(!(item.startsWith("//") || item.startsWith("\n"))){
            var separator = item.indexOf("=");
            var name = item.substring(0, separator);
            var src = item.substring(separator + 1);
    
            imgSrcs.push(src);
            imgNames.push(name);
        }
    });

    startFrame();
}

function startFrame(){
    frame.src = imgSrcs[currentImg];

    setInterval(update, 2000);
}

function update(){
    currentImg++;

    if(currentImg >= imgSrcs.length)
        currentImg = 0;

    frame.src = imgSrcs[currentImg];
    picName.innerHTML = imgNames[currentImg];
}

/*
* File Request Code
*/
var requestSleepTime = 20;

function getFile(pathToRead) {
    console.log("Getting File: " + pathToRead);
    var request = new XMLHttpRequest();
    request.open("GET", pathToRead, false);
    setTimeout(function () { updateRequest(request, parseImgFile); }, requestSleepTime);
    request.send(null);
}

function updateRequest(request, funcToCall) {
    if (request.readyState == request.DONE) {
        if (request.status == 200) {
            funcToCall(request);
            return;
        }
    }
    setTimeout(function () { updateRequest(request, parseImgFile); }, requestSleepTime);
}