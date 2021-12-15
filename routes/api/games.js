const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonWebToken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Games = require('../../models/Games');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//GET gets all games
//Public
router.get('/', async (req, res) => {
  try {
    let games = await Games.find({});
    res.send(games);  

  } catch (err) {
    
    res.status(500).send('Server Error');   
  }

});


//Post add a new game 
//Private
router.post('/add-game', auth, async(req,res) => {
  try {
    let { name, tags } = req.body;
    let game = await Games.findOne({name});

    if(game) {
      return res
        .status(500)
        .send('Game already exists');
    }

    game = new Games({
      name,
      tags
    });

    await game.save();

    res.send(game);
  } catch (err) {

    res.status(500).send(err); 
  }
});

router.post('/add-game-to-profile',[
   check('gameList', 'the list should not be empty')
     .isArray().notEmpty()
 ],
 auth,
 async (req, res) => {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    gameList,
    email
  } = req.body;

  try {
    let profile = await Profile.findOne({ email });

    gameList.map(async (game) => {
      let { name, score, tags } = game;
      let savedGame = await Games.findOne({ name });

      if(!savedGame) {
        let newGame = new Games({ name, score, tags });
        await newGame.save();
      }
    });

    await Profile.findOneAndUpdate(
      {email},
      {
        gameList
      }
    );

    res.send(gameList);

  } catch (err) {
   
    res.status(500).send('Internal Server error');
  }
 });

module.exports = router;