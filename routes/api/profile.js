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
  check('staredGame', 'you need to add your favorite game')
    .not()
    .isEmpty(),
  check('staredGame.name', 'The game name is requierd')
    .not()
    .isEmpty(),
  check('staredGame.tags', 'Genres are requierd')
    .not().isEmpty()
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
    social,
    PreferedConsole
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
      let { image } = profile;
      await Profile.findOneAndReplace(
        {email: email},
        {
          name: user.name,
          email,
          staredGame,
          image,
          social,
          PreferedConsole
      });
      return res.send(profile);
    }

    profile = new Profile({
      name: user.name,
      email,
      staredGame,
      social,
      PreferedConsole
    });

    await profile.save();
    
    res.send(profile);

  } catch (err) {

    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.get('/:email', [
  check('email', 'email is requierd').not().isEmpty()
],
async (req, res) => {
  let { email } = req.params;
  
  try {
    let profile = await Profile.findOne({ email: email });

    if(!profile) {
      return res.status(500).json(
        [{ errors: 'profile dose not exist' }]
      );
    };
    return res.send(profile);
  } catch (err) {
    res.status(500).send('server error');
  }
});


module.exports = router;