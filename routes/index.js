
import { Console } from 'console';
import express from 'express'
import Post from '../db.js'
var router = express.Router();

const isEmptyObject = (object) => {
  return Object.keys(object).length === 0;
}


// create a new post
router.post('/api/post', async function(req, res) {
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

// gets all posts or filters by passed params
router.get('/api/post', async function(req, res) {
  try { 

    if(isEmptyObject(req.query)) {
      const allPosts = await Post.find()
      return res.json({ status: 'success', data: allPosts})
    }else {
      const { distanceAway, minPrice, maxPrice, minSize, maxSize } = req.query;

      const filteredPosts = await Post.find({
        $and: [
          { distanceAway: { $lte: distanceAway} },
          { price: { $lte: maxPrice || 1000000, $gte: minPrice || 0 } },
          { size: { $lte: maxSize || 1000000, $gte: minSize || 0 } }
        ]
      })
      return res.json({status: 'success', data: filteredPosts})
    }

    
  }catch(err) {
    console.log('Error is: ', err)
    return res.status(400).json({
      message: 'Could not get posts'
    })
  }
})

export default router;
