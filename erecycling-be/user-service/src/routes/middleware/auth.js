const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, INTERNAL_API_KEY } = require("../../common/app-constant");
class AuthMiddleware {
  protectApi = async (req, res, next) => {
    try {
      //   if (INTERNAL_API_KEY == req.headers["internal_api_key"]) {
      //     next();
      //   }

      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        throw new Error("You are not logged in! Please log in to get access");
      }

      const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
      console.log(decodedToken);
      req.user = {
        id: decodedToken.id,
        role: decodedToken.role,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
      };
      next();
    } catch (err) {
      return next(err);
    }
  };

  restrictTo =
    (...roles) =>
    (req, res, next) => {
      //roles ['admin', 'staff', 'customer]
    //   console.log(req.user);
      if (!roles.includes(req.user.role)) {
        return next(new Error("You do not have permission to perform this action"));
      }
      next();
    };
}
module.exports = new AuthMiddleware();
