const jwt = require('jsonwebtoken');
const { readSessionByToken, deleteSession } = require('../services/sessionService');

const logout = async (req, res, next) => {
  const refreshToken = req.body.token;
  let sessionToDelete; 
 
  try {
    sessionToDelete = await readSessionByToken(refreshToken);
  } catch (e) { 
  }

  // Delete RefreshToken if found in db
  if (sessionToDelete != null){
    const deletedSession = await deleteSession(refreshToken);
    return res.status(200).send();
  }

  // If there is no refreshToken found, then simply return success
  return res.status(200).send();
}

module.exports = {
  logout
}
