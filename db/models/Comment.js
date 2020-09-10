// Require necessary NPM package(s) and point to db connection
const mongoose = require('../connection');

// Set var for CommentSchema = new
// set objects that will be part of the schema
const CommentSchema = new mongoose.Schema(
	{
		comment: String,
	},
	{ timestamps: true }
);

// Export module to mongoose ('Comment', var for CommentSchema)
module.exports = CommentSchema;
