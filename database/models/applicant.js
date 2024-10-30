module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define(
    "Applicant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      resume: DataTypes.TEXT,
      phone: DataTypes.STRING,
      applicantStatus: {
        type: DataTypes.ENUM("submitted", "approved", "rejected", "scheduled"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["submitted", "approved", "rejected", "scheduled"]],
            msg: "Applicant Status Not Supported",
          },
        },
      },
      status: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Applicant.associate = (models) => {
    Applicant.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Applicant.belongsTo(models.Job, {
      foreignKey: "jobId",
      onDelete: "CASCADE",
    });
  };

  return Applicant;
};
