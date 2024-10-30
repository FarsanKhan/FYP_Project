module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      read: DataTypes.BOOLEAN,
    },
    { underscored: true }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      as: "Receiver",
    });
    Notification.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "Sender",
    });
    Notification.belongsTo(models.Job, {
      foreignKey: "referenceId",
      as: "JobReference",
    });
    Notification.belongsTo(models.Post, {
      foreignKey: "referenceId",
      as: "PostReference",
    });
  };

  return Notification;
};
