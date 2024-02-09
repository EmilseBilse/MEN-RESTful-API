const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const swaggerDefinition = yaml.load("./swagger.yaml");
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));


const hippoRoutes = require("./routes/hippo");
const authRoutes = require("./routes/auth");

require("dotenv-flow").config();

app.use(bodyParser.json());

// Cors for local frontend development
app.use(cors({
  origin: 'http://localhost:5173'
}));


mongoose.connect(
    process.env.DBHOST
).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log("connected successfully to MongoDB"))

app.use("/api/hippos", hippoRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
})

module.exports = app;