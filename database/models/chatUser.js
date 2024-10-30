module.exports = (sequelize, DataTypes) => {
  const ChatUser = sequelize.define(
    "ChatUser",
    {},
    { paranoid: true, underscored: true }
  );
  return ChatUser;
};
