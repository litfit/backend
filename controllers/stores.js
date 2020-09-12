// Require necessary NPM package(s)
const express = require('express');
// Require router
const router = express.Router();
// Set var to path of models (stores)
const Store = require('../db/models/Store');
const Comment = require('../db/models/Comment');

// Require any middleware for error functions and { deconstruct } any functions

// Require any middleware for auth functions and { deconstruct } any functions

// Set up route
// INDEX
// GET api/stores
router.get('/', (req, res) => {
	Store.find()
		.sort([['updatedAt', 'descending']])
		.then((allStores) => {
			res.json(allStores);
		});
});
// SHOW
// GET api/stores/`db _id string here`
router.get('/:name', (req, res) => {
	const storeName = req.params.name;
	Store.findOne({ name: storeName })
		.populate('comments')
		.then((store) => {
			res.json(store);
		});
});

// CREATE
// POST api/stores
router.post('/new', (req, res) => {
	const newStore = req.body;
	Store.create(newStore).then((newPicture) => {
		res.json(newPicture);
	});
});

// UPDATE
// PUT api/stores/`db _id string here`
router.put('/:id', (req, res) => {
	Store.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		(prevRecord) => {
			res.json(prevRecord);
		}
	);
});

// DESTROY
// DELETE api/stores/`db _id string here`
router.delete('/:id', (req, res) => {
	Store.findOneAndDelete({ _id: req.params.id }).then((deleted) => {
		res.json(deleted);
	});
});

//Create comment
router.post('/:imageId/comments', (req, res, next) => {
	Store.findById(req.params.imageId)
		.then((image) => {
			store.comments.unshift(req.body);
			return store.save();
		})
		.then((store) => {
			res.json(store);
		})
		.catch(next);
});

//Delete Comment
router.delete('/:storeId/comments/:id', (req, res, next) => {
	const storeId = req.params.storeId;
	const commentId = req.params.id;
	Store.findById(storeId)
		.then((store) => {
			const comment = store.comments.id(commentId);
			comment.remove();
			return store.save();
		})
		.then((store) => {
			res.json(store);
		})
		.catch(next);
});

// Export module to router
module.exports = router;
