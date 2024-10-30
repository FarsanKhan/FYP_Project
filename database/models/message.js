module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: DataTypes.TEXT,
      read: DataTypes.BOOLEAN,
      status: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.Chat, {
      foreignKey: "chatId",
      onDelete: "CASCADE",
    });
    Message.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Message;
};
