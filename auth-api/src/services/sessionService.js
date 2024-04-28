const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function readSessionByToken(token) {
  const sessionResult = await prisma.active_session.findUnique({
    where: {
      token: token
    }
  });

  return sessionResult;
}

async function createSession(token, userId) {
  const sessionResult = await prisma.active_session.create({
    data: {
      token: token,
      user_id: Number(userId)
    }
  });

  return sessionResult;
}

async function deleteSession(token){
  const deletedSessionResult = await prisma.active_session.delete({
    where: {
      token: token
    }
  });

  return deletedSessionResult;
}
module.exports = {
  readSessionByToken,
  createSession,
  deleteSession
}
