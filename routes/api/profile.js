const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const config = require('config');

const {upload} = require('../../middleware/upload');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// grid fs stream init
const db = config.get('mongoURI');
let gfs;
const dbConnection = mongoose.createConnection(db);

gfs = dbConnection.once('open', () => {
  console.log('stream connected');
  gfs = Grid(dbConnection.db, mongoose.mongo);
  gfs.collection('images');
});


//@route   POST api/upload
//@desc    pic upload route
//@access  Private

router.post('/upload/:email/:type', upload.single('file'), async (req, res) =>{ 
  try {
    let {
      email,
      type
    } = req.params;

    let {
      filename
    } = req.file;

    let profile = await Profile.findOne({ email });


   let {
     staredGame,
     social,
     id,
     name,
     image,
     PreferedConsole,
     gameList,
   } = profile;

  await Profile.replaceOne(
    {email: email},
    { 
      email,
      staredGame,
      social,
      id,
      name,
      PreferedConsole,
      gameList,
      image: filename
    }
    );
    res.send(filename);
  } catch (err) {

    res.status(500).send('internal server error');
  }
});


router.delete('/delete-avatar/:email/:filename', async(req, res) => {
  const {
    email,
    filename
  } = req.params;

  
  try {
    const image = await gfs.files.findOne({ filename });

   

    if( image !== null ) {
      const { _id } = image;
      gfs.db.collection('images.chunks').deleteMany({ files_id: _id });

      gfs.files.deleteOne({ filename });  
      
      return res.send('updated');
    }



    res.status(404).send('file not found');

  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/avatar/:filename', async (req, res) => {
  
  if(gfs) {

    gfs.files.findOne({ filename: req.params.filename }).then((file) => {
      if (!file) return res.status(404).json({ err: 'No File Exists' });

      if (['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.contentType)) {
        const bucket = new mongoose.mongo.GridFSBucket(dbConnection.db, {bucketName: 'images',});
        const readStream = bucket.openDownloadStreamByName(file.filename);
        readStream.pipe(res);

      } else {
        return res.json({ imagen: file });
      }
    });
  }

});


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
      await Profile.findOneAndReplace(
        {email: email},
        {
          name: user.name,
          email,
          staredGame,
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