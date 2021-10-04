const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

// AWS-S3 설정
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

//MULTER-S3 설정
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "the-form-images/surveys",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
    },
  }),
});
module.exports = upload;
