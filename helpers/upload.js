const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: ((req, file, cb) => {
    const dir = `./public/uploads${req.originalUrl}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (err) => {
        console.log(err);
      });
    }
    cb(null, dir);
  }),
  filename: ((req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }),
});

exports.upload = multer({ storage });
