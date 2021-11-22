const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const config = require('config');

const db = config.get('mongoURI');


let gfs;
const dbConnection = mongoose.createConnection(db);

dbConnection.once('open', () => {
  console.log('stream connected');
  gfs = Grid(dbConnection.db, mongoose.mongo);
  gfs.collection('images');
});

const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const filename = buf.toString('hex') + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: 'images'
      };
      resolve(fileInfo);
    });
  });
}
});


const upload = multer({ storage });

module.exports = {upload, gfs};