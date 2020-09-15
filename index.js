
// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Instantiate express application object
const app = express();

// .use cors
app.use(cors());

// Add express.json
app.use(express.json());

// urlencoded
app.use(express.urlencoded({ extended: true }));

// Require the store resources routes and controllers
const storesController = require('./controllers/stores');
app.use('/api/stores', storesController);



// Handle Errors Server-wide
// This is part of middleware that will be part of stretch goals

app.set('port', process.env.PORT || 4000);



app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
