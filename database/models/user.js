module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      image: DataTypes.STRING,
      industry: DataTypes.STRING,
      location: DataTypes.STRING,
      about: DataTypes.TEXT,
      headline: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      type: {
        type: DataTypes.ENUM("job_seeker", "employer"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["job_seeker", "employer"]],
            msg: "User Type Not Supported",
          },
        },
      },
      phone: DataTypes.STRING,
      status: DataTypes.INTEGER,
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifyToken: {
        type: DataTypes.STRING(511),
      },
      verifyExpiry: {
        type: DataTypes.FLOAT,
      },
      resetToken: {
        type: DataTypes.STRING(511),
      },
      resetTokenExpiry: {
        type: DataTypes.FLOAT,
      },
    },
    { underscored: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Job, {
      foreignKey: "userId",
    });
    User.hasMany(models.JobView, {
      foreignKey: "userId",
    });
    User.hasMany(models.Applicant, {
      foreignKey: "userId",
    });
    User.hasMany(models.Follower, {
      foreignKey: "companyId",
      as: "CompanyFollowing",
    });
    User.hasMany(models.Follower, {
      foreignKey: "userId",
      as: "UserFollowers",
    });
    User.belongsToMany(models.Chat, {
      through: models.ChatUser,
      foreignKey: "userId",
      as: "users",
    });
  };

  return User;
};
