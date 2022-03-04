
import express from 'express'
import Post from '../db.js'
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
  const allPosts = await Post.find()
  res.json({ posts:allPosts})
});

router.post('/', async function(req, res) {
  try {
   const {placeName, area, size, distanceAway, price, description, leasingterm} = req.body;
    const newPost = new Post({ placeName, area, size, distanceAway, price, description, leasingterm});
    await newPost.save();
    if(newPost) {
    return res.json({
      message: 'New post created',
      data: newPost
    })
    }
  }catch(err) {
    return res.status(400).json({
      message: 'Could not create a new post'
    })
  }
})

router.get('/', async function(req, res) {
  try {




  }catch(err) {
    return res.status(400).json({
      message: 'Could not create a new post'
    })
  }
})

export default router;
