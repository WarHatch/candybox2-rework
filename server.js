const express = require('express');
// const path = require('path');
const cors = require("cors");

const app = express();

app.use(cors());

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
