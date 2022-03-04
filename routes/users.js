import express from 'express';
var router = express.Router();

/* GET user info. */
router.get('/', async function(req, res, next) {
  // let session = req.session;
  let testUsername = "test user";
  try {
    // let findUser = session.account.username;
    let findUser = testUsername;
    let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
    let allapt = userInfo[0].saved;
    let aptInfo = []
    console.log(allapt[0]);
    console.log(allapt.length)
    for (let i = 0; i < allapt.length; i++) {
      let apt = await req.db.User.find().where('placeName').in(allapt[i]).exec(); // change to db.Apartment later
      // console.log(apt)
      if (apt.length > 0) {
        aptInfo.push(apt);
      }
    }
    console.log(aptInfo)
    res.json(aptInfo);
  } catch(error) {
    res.json({"status": "error", "error": error})
  }
});


// Save User -> Create Account button?
router.post('/', async function(req, res, next) {
  let testUsername = "another user";
  // let session = req.session;
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
  let testUsername = "test user";
  // let session = req.session;
  // if (session.isAuthenticated) {
    console.log("test")
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
  // } else {
  //   res.json({"status": "error", "error": "not logged in"})
  // }
})

// Remove saved apt
router.post('/unsaveApt', async function(req, res, next) {
  // let session = req.session;
  // if (session.isAuthenticated) {
    let testUsername = "test user";
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
  // } else {
  //   res.json({"status": "error", "error": "not logged in"})
  // }
})

export default router;
