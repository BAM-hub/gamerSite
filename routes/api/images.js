const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { upload } = require("../../middleware/upload");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Games = require("../../models/Games");
const User = require("../../models/User");

// grid fs stream init

const db = process.env.mongoURI;
let gfs;
const dbConnection = mongoose.createConnection(db);

gfs = dbConnection.once("open", () => {
  console.log("stream connected");
  gfs = Grid(dbConnection.db, mongoose.mongo);
  gfs.collection("images");
});

//@route   POST api/upload
//@desc    pic upload route
//@access  Private

router.post(
  "/upload/:email/:type",
  [check("email", "Email Should be a valid one").isEmail()],
  auth,
  upload.single("file"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // auth user if he is the same as the profile owner
    const {
      user: { id },
    } = jwt.decode(req.header("x-auth-token"), process.env.jwtSectret);
    const user = await User.findOne({ _id: id });
    if (user.email !== req.params.email) {
      return res.status(200).send("Authoraization Denied");
    }

    let { email, type } = req.params;

    let { filename } = req.file;

    try {
      if (type === "avatar") {
        await Profile.findOneAndUpdate({ email: email }, { image: filename });

        return res.send(filename);
      }

      let gamePrams = type.split(":");
      let gameName = gamePrams[1];

      await Games.findOneAndUpdate({ name: gameName }, { image: filename });

      return res.send(filename);
    } catch (err) {
      res.status(500).send("internal server error");
    }
  }
);

//@route   DELETE api/delete-avatr:email:fielname
//@desc    avatar delete route
//@access  Private
router.delete(
  "/delete-avatar/:email/:filename",
  [check("email", "Email Should Be Valid")],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // auth user if he is the same as the profile owner
    const {
      user: { id },
    } = jwt.decode(req.header("x-auth-token"), process.env.jwtSectret);
    const user = await User.findOne({ _id: id });

    if (user.email !== req.params.email) {
      return res.status(200).send("Authoraization Denied");
    }

    const { email, filename } = req.params;

    try {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        return res.status(404).send("Profile Not Found");
      }

      if (profile.image !== filename) {
        return res.status(200).send("Authoraization Denied");
      }

      const image = await gfs.files.findOne({ filename });

      if (image !== null) {
        const { _id } = image;
        gfs.db.collection("images.chunks").deleteMany({ files_id: _id });

        gfs.files.deleteOne({ filename });

        await Profile.findOneAndUpdate({ email }, { image: "" });

        return res.send("updated");
      }

      res.status(404).send("file not found");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//@route   GET api/avatar:fielname
//@desc    avatar get route
//@access  Public
router.get("/avatar/:filename", async (req, res) => {
  if (gfs) {
    gfs.files?.findOne({ filename: req.params.filename }).then((file) => {
      if (!file) return res.status(404).json({ err: "No File Exists" });

      if (
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.contentType
        )
      ) {
        const bucket = new mongoose.mongo.GridFSBucket(dbConnection.db, {
          bucketName: "images",
        });
        const readStream = bucket.openDownloadStreamByName(file.filename);
        readStream.pipe(res);
      } else {
        return res.json({ imagen: file });
      }
    });
  }
});

module.exports = router;
