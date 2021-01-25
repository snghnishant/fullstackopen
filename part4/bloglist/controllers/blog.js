const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/blogs", (req, res) => {
	Blog.find({}).then((blogs) => {
		res.json(blogs);
	});
});

router.post("/blogs", (req, res) => {
	const body = req.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	blog.save().then((result) => {
		res.status(201).json(result);
	});
});

module.exports = router;
