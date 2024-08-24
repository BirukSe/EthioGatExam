const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('../../config/db'); // Adjust path as needed
const examsRouter = require('../../routes/exams'); // Adjust path as needed

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/exams', examsRouter);

module.exports.handler = serverless(app);
