module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reason: DataTypes.STRING,
      entity: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Report.associate = (models) => {
    Report.belongsTo(models.Job, {
      foreignKey: "entityId",
      onDelete: "CASCADE",
      as: "JobReport",
    });
    Report.belongsTo(models.Post, {
      foreignKey: "entityId",
      onDelete: "CASCADE",
      as: "PostReport",
    });
    Report.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Report;
};
