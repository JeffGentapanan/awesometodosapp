require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

const app = express();
app.use(express.json());

// FIX: Point to the 'client/dist' directory instead of just 'dist'
app.use(express.static(path.join(__dirname, '../client/dist')));

const router = require("./routes");
app.use("/api", router);

// FIX: The "Catch-All" route to handle React Router navigation
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};
startServer();