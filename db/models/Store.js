// Require necessary NPM package(s) and point to db connection
const mongoose = require('../connection');
const commentSchema = require('../models/Comment');

// Set var for imageSchema = new
// set objects that will be part of the schema
const ImageSchema = new mongoose.Schema(
	{
		name: String,
		location: String,
		image: [],
		comments: [commentSchema],
	},
	{ timestamps: true }
);

const Image = mongoose.model('Image', ImageSchema);

// Export module to mongoose ('Image', var for imageSchema)
module.exports = Image;
