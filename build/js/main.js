// Put everything in an IIFE (Immediately-Invoked Function Expression) to scope all of the variables to their own scope
(function () {
    // Wait for the dom to be loaded before accessing the document nodes
    document.addEventListener("DOMContentLoaded", function () {
        // Get the links from the header
        var links = Array.from(document.getElementById("links").childNodes)

        // Find what file is currently being accessed
        var url = window.location.pathname

        // If the root file is accessed, act as it is index.html
        if (url === "" || url === "/") {
            url = "/index.html"
        }

        // Make the matching href have the "active" class and is removed from all others
        // Also filter out any node with #text because whitespace is being parsed as a node
        links.filter(link => link.nodeName !== "#text").forEach(function (link) {
            if (link.pathname === url) {
                link.classList.add("active")
            } else {
                link.classList.remove("active")
            }
        })

        // Every time the mobile button is pressed, toggle the open class
        document.getElementById("menu-button").addEventListener("click", function () {
            document.getElementById("navbar").classList.toggle("open")
        })

    }, false)
})()
