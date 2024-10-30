module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    "Follower",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { underscored: true }
  );

  Follower.associate = (models) => {
    Follower.belongsTo(models.User, {
      foreignKey: "companyId",
      onDelete: "CASCADE",
      as: "Company",
    });
    Follower.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "User",
    });
  };

  return Follower;
};
