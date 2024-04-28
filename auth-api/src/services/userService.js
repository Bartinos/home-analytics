const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function readUserByUsername(username){
  const userResult = await prisma.person.findUnique({
    where: {
      username: username 
    }
  });
  return userResult;
}


module.exports = {
  readUserByUsername
}
