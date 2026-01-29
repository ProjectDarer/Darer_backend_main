// config/livekit.js
const { AccessToken } = require("livekit-server-sdk");

const createToken = ({ roomName, userId, canPublish }) => {
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: userId }
  );

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish,
    canSubscribe: true
  });

  return token.toJwt();
};

module.exports = { createToken };
