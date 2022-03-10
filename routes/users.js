import express from 'express';
var router = express.Router();

/* GET user info. */
router.get('/', async function(req, res, next) {
  console.log(req.session)
  // let session = req.session;
  // let testUsername = "test user";
  if (req.session.isAuthenticated) {
    let testUsername = req.session.account.username;
    console.log(testUsername);
    try {
      // let findUser = session.account.username;
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
        console.log(allPreviews)
        // res.json(apt);
        res.json(allPreviews);
      }
    } catch(error) {
      res.json({"status": "error", "error": error})
    }
  } else {
    res.json({"status": "error", "error": "not logged in"})
  }
});

// Get html for a url.
async function getHtml(apt) {
  try {
    // Encode and decode HTML entities
    // https://stackoverflow.com/questions/40263803/native-javascript-or-es6-way-to-encode-and-decode-html-entities
    const escapeHTML = str => str.replace(/[&<>'"]/g,
      tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));

    let htmlReturn = ""
    htmlReturn = `<div>
                    <h2 id=${apt["placeName"]} class="detail-titles">${apt["placeName"]}</h2>
                    <flex class="center">
                        <img class="viewImg" src="img/living-room.jpg" alt="photo of the living room of the apartment" loading="lazy">
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
                                        <p class="card-text">Leasing Term: ${apt["leasingterm"]} months</p>
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


// Save User -> Create Account button?
router.post('/', async function(req, res, next) {
  // let testUsername = "another user";
  // let testUsername = req.body.username;
  let testUsername = req.body.username;
  console.log(testUsername)
  try {
    let checkUser = await req.db.User.find().where('username').in(testUsername).exec(); //change later
    if (checkUser.length > 0) {
      res.json({"status": "error", "error": "already have an acccount"})
    } else {
      // await req.db.User.find()
      const User = new req.db.User({
        username: testUsername,
        // username: session.account.username,
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

// Add apt to saved -> Add save button
router.post('/saveApt', async function(req, res, next) {
  // let testUsername = "test user";
  // let session = req.session;
  if (req.session.isAuthenticated) {
    let testUsername = req.session.account.username;
    console.log("here username:", testUsername)
    try {
      let newSave = req.query.apt; // or req.body.apt;
      // let findUser = session.account.username;
      let findUser = testUsername;
      let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
      console.log(userInfo);
      // let allapt = userInfo[0].saved;
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

// Remove saved apt
router.post('/unsaveApt', async function(req, res, next) {
  // let session = req.session;
  if (req.session.isAuthenticated) {
    // let testUsername = "test user";
    let testUsername = req.session.account.username;
    try {
      let findApt = req.query.apt; // or body param
      // let findUser = session.account.username;
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
    console.log(loginInfo);
    res.json(loginInfo);
  } else {
    res.json({"status": "loggedout" })
  }
})

export default router;
