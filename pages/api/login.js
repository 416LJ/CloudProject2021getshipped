import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import withSession from '../../lib/withSession';

const prisma = new PrismaClient();

const login = withSession(async (req, res) => {
  const { email, password, } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new Error(`User with email "${email}" does not exist.`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid password.");
    }
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
});

export default login;
