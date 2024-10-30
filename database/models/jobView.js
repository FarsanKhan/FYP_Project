module.exports = (sequelize, DataTypes) => {
  const JobView = sequelize.define(
    "JobView",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { underscored: true }
  );

  JobView.associate = (models) => {
    JobView.belongsTo(models.Job, {
      foreignKey: "jobId",
      onDelete: "CASCADE",
    });
    JobView.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return JobView;
};
