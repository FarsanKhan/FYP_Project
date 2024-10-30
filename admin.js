const db = require("../database/models");
const jwt = require("jsonwebtoken");
const { User } = db.sequelize.models;

module.exports = async (req, res, next) => {
  try {
    const authToken = req.headers["auth-token"];
    if (!authToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    jwt.verify(authToken, process.env.APP_SECRET);
    const decoded = jwt.decode(authToken);
    if (!decoded.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = await User.findOne({
      where: { id: decoded.userId },
      attributes: ["id", "type"],
    });
    if (user === null || user.type !== "admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = { id: user.id, type: user.type };
    next();
  } catch (error) {
    next(error);
  }
};
