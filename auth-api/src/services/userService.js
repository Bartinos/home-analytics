const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function readUserByEmail(username){
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
