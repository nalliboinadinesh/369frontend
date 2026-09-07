import jwt from "jsonwebtoken";

const verifyToken = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        message: "Access denied. Token is required"
      });
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      return response.status(401).json({
        message: "Access denied. Token is required"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded.userId || decoded.id;
    if (!request.user) {
      return response.status(401).json({
        message: "Invalid token subject"
      });
    }

    next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export default verifyToken;