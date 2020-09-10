// Require necessary NPM package(s)
// Mongoose
const mongoose = require('mongoose');

// Create a ternary that looks for NODE_ENV and if NODE_ENV is set to 'production', it'll use the URI for the database stored in the 'MONGODB_URI' environment variable. (Otherwise it'll use the local)
let mongoURI =
	process.env.NODE_ENV === 'production'
		? process.env.DB_URL
		: 'mongodb://localhost/stores';

// Mongoose connection to localhost
mongoose.connect(mongoURI, { useMongoClient: true });

// Include the following:
// useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
	.connect(mongoURI)
	.then((instance) =>
		console.log(`Connected to store db: ${instance.connections[0].name}`)
	)
	.catch((error) => console.log('Connection failed!', error));

// Export module
module.exports = mongoose;
