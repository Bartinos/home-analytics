const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/tokenGenerator');
const { readSessionByToken } = require('../services/sessionService');

const generateToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401).send();
  
  // Check if refreshToken is in database
  const foundToken = await readSessionByToken(refreshToken);
  if(foundToken == null || foundToken == undefined){
    return res.status(401).send();
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send();

    const accessToken = tokenGenerator.generateAccessToken({
      username: user.username,
    });
    return res.json({ accessToken });
  });
}


module.exports = {
  generateToken
}
