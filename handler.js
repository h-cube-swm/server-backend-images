"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const { getResponse: gr, getComment: gc } = require("./utils/response");

const upload = async () => {
  const s3Params = {
    Bucket: "the-form-images",
    Body: "hello-world",
    Key: "testFile.txt",
    ContentType: "text/html",
    ACL: "public-read",
  };

  return await new Promise((resolve, reject) => {
    s3.putObject(s3Params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports.main = async (event) => {
  if (event.requestContext.http.method === "OPTIONS")
    return gc(200, "This is good. Server is absolutly alive!");

  // console.log(event);
  console.log(event.body);

  if (!event.body) {
    return gc(400, "body field required(surveyId, image, userId)");
  }
  const params = JSON.parse(event.body);
  const { surveyId, image, userId } = params;
  if (!surveyId || !image) {
    return gc(400, "surveyId and image field required");
  }

  return upload(image);
};
