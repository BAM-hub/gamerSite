const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Games = require("../../models/Games");
const Profile = require("../../models/Profile");

//GET gets all games
//Public
router.get("/", async (req, res) => {
  try {
    let games = await Games.find({});
    res.send(games);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Post add a new game
//Private
router.post("/add-game", auth, async (req, res) => {
  try {
    let { name, tags } = req.body;
    let game = await Games.findOne({ name });

    if (game) {
      return res.status(500).send("Game already exists");
    }

    game = new Games({
      name,
      tags,
    });

    await game.save();

    res.send(game);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post(
  "/add-game-to-profile",
  [check("gameList", "the list should not be empty").isArray().notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameList, email } = req.body;

    try {
      let existingGames = [];
      existingGames.push(
        await Promise.all(
          gameList.map(async (game) => {
            let { name, tags } = game;
            let savedGame = await Games.findOne({ name });

            if (savedGame) return 0;

            game = new Games({
              name,
              tags,
              image: "",
            });
            await game.save();

            return 1;
          })
        )
      );

      await Profile.findOneAndUpdate({ email }, { gameList });

      res.send({ existingGames, gameList });
    } catch (err) {
      res.status(500).send("Internal Server error");
    }
  }
);

//PRIVATE
router.get("/game-list/:email", async (req, res) => {
  //to get the final games data morrow
  let { email } = req.params;
  try {
    let profile = await Profile.findOne({ email });
    let { gameList } = profile;

    let newList = [];
    newList.push(
      await Promise.all(
        gameList.map(async (game) => {
          let { name, score } = game;
          let newGame = await Games.findOne({ name });
          let { _id, image, tags } = newGame;
          return {
            name,
            score,
            _id,
            image,
            tags,
          };
        })
      )
    );
    await Profile.findOneAndUpdate({ email }, { gameList: newList[0] });

    res.send(newList[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
