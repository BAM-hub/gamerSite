const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route   POST api/profile
//@desc    profile route
//@access  Private

router.post('/create-profile', [
  check('email', 'email is requierd').not().isEmpty(),
  check('name', 'name is requierd').not().isEmpty(),
  check('staredGame', 'you need to add your favorite game')
    .not()
    .isEmpty(),
  check('staredGame.name', 'The game name is requierd')
    .not()
    .isEmpty(),
  check('staredGame.tags', 'Genres are requierd')
    .isArray()
],
auth,
async (req, res) =>{ 

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { 
    email,
    staredGame,
    gameList,
    social
   } = req.body;

  try {
    //see if user exists
    let user = await User.findOne({ email });
    let profile = await Profile.findOne({ email });

    if (!user) {
      return res.status(500).json(
        [{ errors: 'user dose not exist' }]
      );
    }

    if(profile) {
      return res.status(500).json(
        [{ errors: 'profile dose exist' }]
      );
    }

    profile = new Profile({
      name: user.name,
      email,
      staredGame,
      gameList,
      social
    });

    await profile.save();
    
    res.send('profile created');

  } catch (err) {

    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.get('/', [
  check('email', 'email is requierd').not().isEmpty()
],
async (req, res) => {
  let { email } = req.body;

  try {
    let profile = await Profile.findOne({ email });

    if(!profile) {
      return res.status(500).json(
        [{ errors: 'profile dose not exist' }]
      );
    };
    res.send(profile);
  } catch (err) {
    res.status(500).send('server error');
  }
});


module.exports = router;