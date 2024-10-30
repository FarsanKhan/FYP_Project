module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.Job, {
      foreignKey: "jobId",
      onDelete: "CASCADE",
    });
    Feedback.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Feedback;
};
