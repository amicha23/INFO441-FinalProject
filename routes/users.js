// Endpoints that control the flow of user data. The endpoints
// access our database to retrieve user data and respond to
// requests with the specified user's saved information.

import express from 'express';
var router = express.Router();

// GET all of a user's saved apartment listings.
router.get('/', async function(req, res, next) {
  if (req.session.isAuthenticated) {
    let testUsername = req.session.account.username;
    console.log(testUsername);
    try {
      let findUser = testUsername;
      let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
      let allapt = userInfo[0].saved;
      let apt = await req.db.Apartment.find().where('placeName').in(allapt).exec();
      console.log(apt.length)
      if (apt.length === 0) {
        res.json({"status": "no savings"});
      } else {
        let allPreviews = []; // hold all html pages
        console.log(apt[0].placeName)
        for (let i = 0; i < apt.length; i++ ) {
          let htmlReturn = await getHtml(apt[i]); // return single html page
          console.log(htmlReturn)
          allPreviews.push(htmlReturn);
        }
        res.json(allPreviews);
      }
    } catch(error) {
      res.json({"status": "error", "error": error})
    }
  } else {
    res.json({"status": "error", "error": "not logged in"})
  }
});

// Get html for an apartment card.
async function getHtml(apt) {
  try {
    let htmlReturn = ""
    htmlReturn = `<div>
                    <h2 id=${apt["placeName"]} class="detail-titles">${apt["placeName"]}</h2>
                    <flex class="center">
                        <img class="viewImg" src=${apt["image"]} alt="photo of ${apt["placeName"]}  " loading="lazy">
                    </flex>
                </div>

                <div class="row">
                    <div class="card-row">
                        <div class="column mb-4">
                            <p class="card-text text-center">
                              Description: ${apt["description"]}
                            </p>
                        </div>

                        <div class="column">
                            <div class="card mb-4">
                                <div class="description card-body">
                                    <div>
                                        <p class="card-text">Area: ${apt["area"]}</p>
                                        <p class="card-text">Location: Savanna located on 45th</p>
                                        <p class="card-text">Distance Away: ${apt["distanceAway"]} mi</p>
                                        <p class="card-text">Features: ${apt["features"]}</p>
                                        <p class="card-text">Size: ${apt["size"]} SqFt</p>
                                        <p class="card-text">Price: $${apt["price"]} per month</p>
                                        <a onclick="unsaveApt('${apt["placeName"]}')" id=${apt["placeName"]} class="saved btn btn-dark" href="#" role="button">
                                            <span class="saved-logo-view" aria-label="save listing button">&nbsp;</span>Remove Listing
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    return htmlReturn;
  } catch(err) {
    return JSON.stringify(err);
  }
}


// On the click of login, check if a user is unique.
// If so, save a new user to the database.
router.post('/', async function(req, res, next) {
  let testUsername = req.body.username;
  console.log(testUsername)
  try {
    let checkUser = await req.db.User.find().where('username').in(testUsername).exec(); //change later
    if (checkUser.length > 0) {
      res.json({"status": "error", "error": "already have an acccount"})
    } else {
      const User = new req.db.User({
        username: testUsername,
        saved: [],
        saved_date: new Date().toLocaleDateString()
      })
      await User.save();
      res.json({"status": "success"});
    }
  } catch(error) {
    res.json({"status": "error", "error": error})
  }
});

// Add a unique apt to the saved listings of the user.
router.post('/saveApt', async function(req, res, next) {
  if (req.session.isAuthenticated) {
    let testUsername = req.session.account.username;
    try {
      let newSave = req.query.apt; // or req.body.apt;
      let findUser = testUsername;
      let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
      // load post from the database
      if (!userInfo[0].saved.includes(newSave)) {
        //Include currently logged in user
        userInfo[0].saved.push(newSave);
        await userInfo[0].save();
      }
      res.json({"status": "success"});
    } catch(error) {
      res.json({"status": "error", "error": error})
    }
  } else {
    res.json({"status": "error", "error": "not logged in"})
  }
})

// Remove saved apt from saved listings of a user.
router.post('/unsaveApt', async function(req, res, next) {
  if (req.session.isAuthenticated) {
    let testUsername = req.session.account.username;
    try {
      let findApt = req.query.apt;
      let findUser = testUsername;
      let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
        if (userInfo[0].saved.includes(findApt)) {
          //remove apt from saved
          userInfo[0].saved = userInfo[0].saved.filter((element) => {
            return element !== findApt;
          })
          await userInfo[0].save();
        }
        res.json({"status": "success"});
    } catch (error) {
      res.json({"status": "error", "error": error})
    }
  } else {
    res.json({"status": "error", "error": "not logged in"})
  }
})



// GET login information
router.get('/getIdentity', async function(req, res, next) {
  let session = req.session;
  if (session.isAuthenticated) {
    let loginInfo = {
      status: "loggedin",
      userInfo: {
         "name": session.account.name,
         "username": session.account.username
        }
    }
    res.json(loginInfo);
  } else {
    res.json({"status": "loggedout" })
  }
})

export default router;
