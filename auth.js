const db = require("../database/models");
const jwt = require("jsonwebtoken");
const { User } = db.sequelize.models;

module.exports = async (req, res, next) => {
  try {
    console.log(req);

    if (
      req.route &&
      req.route.path &&
      (req.route.path.includes("/jobs/featured") ||
        req.route.path.includes("/jobs/public"))
    ) {
      next();
      return;
    }
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
      where: { id: decoded.userId, verified: true },
      attributes: [
        "id",
        "type",
        "name",
        "email",
        "location",
        "skills",
        "headline",
      ],
    });

    if (user === null) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = {
      id: user.id,
      type: user.type,
      name: user.name,
      email: user.email,
      location: user.location,
      skills: user.skills,
      headline: user.headline,
    };
    next();
  } catch (error) {
    next(error);
  }
};
