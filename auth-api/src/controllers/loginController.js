const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/tokenGenerator');
const bcrypt = require('bcrypt');
const { readUserByUsername} = require('../services/userService');
const { createSession } = require('../services/sessionService');

const login = async (req, res, next) => {
  // TODO: validate input, enable password check

  const foundUser = await readUserByUsername(username)

  // Check if user with corresponding username exists
  if(foundUser == null || foundUser == undefined){
    return res.status(404).send({ errorMessage: "Could not find user matching the provided credentials."});
  }

  // Check if provided password matches the password in database
  if(bcrypt.compareSync(req.body.password, foundUser.password) == false){ 
    return res.status(404).send({ errorMessage: "Could not find user matching the provided credentials."});
  }

  // Place user data into jwt 
  const jwtUser = {
    username: foundUser.username,
  }

  const accessToken = tokenGenerator.generateAccessToken(jwtUser);
  const refreshToken = tokenGenerator.generateRefreshToken(jwtUser);
  const createdSessionResult = await createSession(refreshToken, foundUser.id);

  return res.json({ accessToken, refreshToken})
}


module.exports = {
  login
}
