const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

const staticPath = path.join(__dirname, '../public');
console.log(staticPath);

// Serve static files from the 'public' directory
app.use(express.static(staticPath));

// Serve the homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "hello.html"));
});

// Serve the about page
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "about.html"));
});
app.post("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "about.html"));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
