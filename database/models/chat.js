module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: DataTypes.INTEGER,
    },
    { underscored: true }
  );

  Chat.associate = (models) => {
    Chat.belongsToMany(models.User, {
      through: models.ChatUser,
      foreignKey: "chatId",
      as: "users",
    });
    Chat.hasMany(models.Message, {
      foreignKey: "chatId",
      onDelete: "CASCADE",
    });
  };

  return Chat;
};
