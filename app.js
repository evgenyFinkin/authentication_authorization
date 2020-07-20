// Run Services
require('dotenv').config();
require('./services/mongo');

const express = require('express');
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Routes Middleware
app.use('/apiV1/users', require('./routes/api/user'));
app.use('/apiV1/auth', require('./routes/api/auth'));
app.use('/apiV1/item', require('./routes/api/item'));


const PORT = 1986

app.listen(PORT, console.log(`Running on port ${PORT}`));