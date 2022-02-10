const express = require("express");
const {Post,validatePost} = require("./models/Post");
const router = express.Router();
const verifyToken = require("./verifyToken.js");
const validateMethod = require("./validatorMethod") 


router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
});

router.post("/posts",verifyToken,validateMethod(validatePost), async (req, res) => {
  console.log(req.user["username"])
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user["username"]
  });
  //await post.save();
  res.status(201).send(post);
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
    
  }
});

router.patch("/posts/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/posts/:id", verifyToken, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
