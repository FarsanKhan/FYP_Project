module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      workplaceType: {
        type: DataTypes.ENUM("onsite", "hybrid", "remote"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["onsite", "hybrid", "remote"]],
            msg: "Workplace Type Not Supported",
          },
        },
      },
      type: {
        type: DataTypes.ENUM(
          "full_time",
          "part_time",
          "contract",
          "temporary",
          "other",
          "volunteer",
          "internship"
        ),
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                "full_time",
                "part_time",
                "contract",
                "temporary",
                "other",
                "volunteer",
                "internship",
              ],
            ],
            msg: "Job Type Not Supported",
          },
        },
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      paid: DataTypes.BOOLEAN,
      status: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Job.hasMany(models.JobView, {
      foreignKey: "jobId",
      onDelete: "CASCADE",
    });
    Job.hasMany(models.Applicant, {
      foreignKey: "jobId",
      onDelete: "CASCADE",
    });
  };

  return Job;
};
