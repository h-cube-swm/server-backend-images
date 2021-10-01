/**
 * This function returns a response json
 * @param {Number} status
 * @param {Object} data
 */
const getResponse = (status, result, comment = "Success") => ({
  statusCode: status,
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ result, comment }),
});

const getComment = (status, comment) => getResponse(status, null, comment);

module.exports = { getResponse, getComment };
