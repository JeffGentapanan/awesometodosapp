require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');

const app = express();
app.use(express.json());

// 1. Point to the correct build folder (usually '../client/dist')
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. API routes go first
const router = require("./routes");
app.use("/api", router);

// 3. FIX: Use a Regex to match all routes EXCEPT those starting with /api
// This prevents the PathError and serves your React app correctly
app.get(/^(?!\/api).+/, (req, res) => {
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