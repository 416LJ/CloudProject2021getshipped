import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import withSession from '../../lib/withSession'

const prisma = new PrismaClient();

const signUp = withSession(async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ 
      data: {
        email,
        name,
        password: hashedPassword
      } 
    });
    req.session.set("user", user);
    await req.session.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
});

export default signUp;