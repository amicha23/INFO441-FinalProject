// import express from 'express';
// var router = express.Router();

// /* GET user info. */
// router.get('/', async function(req, res, next) {
//   let session = req.session;
//   try {
//     let findUser = session.account.username;
//     let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
//     let allapt = userInfo[0].saved;
//     let aptInfo = []
//     for (let i = 0; i < allapt.length; i++) {
//       let apt = await req.db.Apartment.find().where('placeName').in(allapt[i]).exec();
//       aptInfo.push(apt);
//     }
//     res.json(aptInfo);
//   } catch(error) {
//     res.json({"status": "error", "error": error})
//   }
// });


// // Save User -> Create Account button?
// router.post('/', async function(req, res, next) {
//   let session = req.session;
//   try {
//     const User = new req.db.UserInfo({
//       username: session.account.username,
//       saved: [String]
//     })
//     await User.save();
//     res.json({"status": "success"});
//   } catch(error) {
//     res.json({"status": "error", "error": error})
//   }
// });

// // Add apt to saved -> Add save button
// router.post('/saveApt', async function(req, res, next) {
//   let session = req.session;
//   if (session.isAuthenticated) {
//     try {
//       let newSave = req.query.apt; // or req.body.apt;
//       let findUser = session.account.username;
//       let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
//       // let allapt = userInfo[0].saved;
//       // load post from the database

//       if (!userInfo[0].saved.includes(newSave)) {
//         //Include currently logged in user
//         userInfo[0].saved.push(newSave);
//         await userInfo[0].save();
//       }
//       res.json({"status": "success"});
//     } catch(error) {
//       res.json({"status": "error", "error": error})
//     }
//   } else {
//     res.json({"status": "error", "error": "not logged in"})
//   }
// })

// // Remove saved apt
// router.post('/unsaveApt', async function(req, res, next) {
//   let session = req.session;
//   if (session.isAuthenticated) {
//     try {
//       let findApt = req.body.apt; // or query param
//       let findUser = session.account.username;
//       let userInfo = await req.db.User.find().where('username').in(findUser).exec(); //change to db name
//         if (userInfo[0].saved.includes(findApt)) {
//           //remove apt from saved
//           userInfo[0].saved = userInfo[0].saved.filter((element) => {
//             return element !== findApt;
//           })
//           await userInfo[0].save();
//         }
//         res.json({"status": "success"});
//     } catch (error) {
//       res.json({"status": "error", "error": error})
//     }
//   } else {
//     res.json({"status": "error", "error": "not logged in"})
//   }
// })

// export default router;
