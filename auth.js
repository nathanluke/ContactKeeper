const webtoken = require("jsonwebtoken");
const config = require("config");

module.exports = function(request, response, next) {
  // get toekn from headwer.
  const token = request.header("x-auth-token");

  // check if not token.
  if (!token) {
    return response.status(401).json({ message: "NO token, access denied" });
  }

  try {
    const decoded = webtoken.verify(token, config.get("jsonWebTokenSecret"));

    request.user = decoded.user;
    next();
  } catch (err) {
    response.status(401).json({ message: "Token is not valid" });
  }
};
