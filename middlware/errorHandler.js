const {constants} = require('../constants');

const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : constants.SERVER_ERROR;
  res.status(statusCode);
  res.json({
    title: getErrorTitle(statusCode),
    message: err.message,
    stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

function getErrorTitle(code) {
  switch (code) {
    case constants.UNAUTHORIZED:
      return "Unauthorized";
    case constants.NOT_FOUND:
      return "Not Found";
    case constants.SERVER_ERROR:
      return "Server Error";
    default:
      return "Error";
  }
}
  
module.exports = errorHandler;
