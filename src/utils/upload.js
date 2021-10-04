const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

// AWS-S3 설정
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const checkMimeType = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.toLowerCase().includes("image")) cb(null, true);
  else cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
};

//MULTER-S3 설정
const upload = multer({
  fileFilter: checkMimeType,
  storage: multerS3({
    s3,
    bucket: "the-form-images/surveys",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      // ToDo: Consider using file hash instead of Date.
      // ToDo: Consider retrive image extension from magic number. What if image does not have extension? What if image have improper extension?
      cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
    },
  }),
});

module.exports = upload;
