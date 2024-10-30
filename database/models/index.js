const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const config = require("../config/config");
const Sequelize = require("sequelize");

const { database, username, password } = config;

delete config.database;
delete config.username;
delete config.password;

const db = {};

const sequelize = new Sequelize(database, username, password, config);

const files = fs.readdirSync(__dirname);

files
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
