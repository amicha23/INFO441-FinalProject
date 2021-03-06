// Endpoints that control the flow of apartment data. The endpoints
// access our database and respond to requests with
// filtered apartment data by the user's request.

import { Console } from 'console';
import express from 'express'
var router = express.Router();

const isEmptyObject = (object) => {
  return Object.keys(object).length === 0;
}


// Create a new apartment post
router.post('/api/post', async function(req, res) {
  try {
   const {placeName, area, size, distanceAway, price, description, leasingterm, roommates, features, image} = req.body;
    const newPost = new req.db.Apartment({ placeName, area, size, distanceAway, price, description, leasingterm, roommates, features, image });
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

// Gets all posts or filters by passed params
router.get('/api/post', async function(req, res) {
  try {

    if(isEmptyObject(req.query)) {
      console.log('Req db is: ', req.db)
      const allPosts = await req.db.Apartment.find()
      res.json({ status: 'success', data: allPosts})
    }else {
      const { distanceAway, minPrice, maxPrice, minSize, maxSize } = req.query;

      const filteredPosts = await req.db.Apartment.find({
        $and: [
          { distanceAway: { $lte: distanceAway || 10 } },
          { price: { $lte: maxPrice || 1000000, $gte: minPrice || 0 } },
          { size: { $lte: maxSize || 1000000, $gte: minSize || 0 } }
        ]
      })
      res.json({"status": "success", "data": filteredPosts})
    }


  }catch(err) {
    console.log('Error is: ', err)
    res.status(400).json({
      message: 'Could not get posts'
    })
  }
})

export default router;
