// Require necessary NPM package(s)
const express = require('express');
// Require router
const router = express.Router();
// Set var to path of models (Images)
const Image = require('../db/models/Image');
const Comment = require('../db/models/Comment');

// Require any middleware for error functions and { deconstruct } any functions

// Require any middleware for auth functions and { deconstruct } any functions

// Set up route
// INDEX
// GET api/images
router.get('/', (req, res) => {
	Image.find()
		.sort([['updatedAt', 'descending']])
		.then((allImages) => {
			res.json(allImages);
		});
});
// SHOW
// GET api/images/`db _id string here`
router.get('/:name', (req, res) => {
	const imageName = req.params.name;
	Image.findOne({ name: imageName })
		.populate('comments')
		.then((image) => {
			res.json(image);
		});
});

// CREATE
// POST api/images
router.post('/new', (req, res) => {
	const newImage = req.body;
	Image.create(newImage).then((newPicture) => {
		res.json(newPicture);
	});
});

// UPDATE
// PUT api/images/`db _id string here`
router.put('/:id', (req, res) => {
	Image.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		(prevRecord) => {
			res.json(prevRecord);
		}
	);
});

// DESTROY
// DELETE api/images/`db _id string here`
router.delete('/:id', (req, res) => {
	Image.findOneAndDelete({ _id: req.params.id }).then((deleted) => {
		res.json(deleted);
	});
});

//Create comment
router.post('/:imageId/comments', (req, res, next) => {
	Image.findById(req.params.imageId)
		.then((image) => {
			image.comments.unshift(req.body);
			return image.save();
		})
		.then((image) => {
			res.json(image);
		})
		.catch(next);
});

//Delete Comment
router.delete('/:imageId/comments/:id', (req, res, next) => {
	const imageId = req.params.imageId;
	const commentId = req.params.id;
	Image.findById(imageId)
		.then((image) => {
			const comment = image.comments.id(commentId);
			comment.remove();
			return image.save();
		})
		.then((image) => {
			res.json(image);
		})
		.catch(next);
});

// Export module to router
module.exports = router;
