const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('../../config/db'); // Adjust path as needed
const authRouter = require('../../routes/auth'); // Adjust path as needed

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);

module.exports.handler = serverless(app);
