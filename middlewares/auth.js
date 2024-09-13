const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const auth = {
  verifyToken: (request, response, next) => {
    try {
      const { token } = request.cookies;
      if (!token) {
        return response.status(401).send({ message: "Access denied" });
      }

      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        request.userId = decodedToken.id;
        next();
      } catch (error) {
        return response.status(401).send({ message: "Invalid token" });
      }
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
};

module.exports = auth;
