const { createJWT } = require("./jwt");

const createUserToken = (user) => {
  const userID = user._id.toString();
  const userToken = createJWT({ userId: userID, role: user.role });

  return {
    name: user.name,
    id: userID,
    token: userToken,
  };
};

module.exports = createUserToken;
