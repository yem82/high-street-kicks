import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(400).send('access denied')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
  } catch (err) {
    res.status(400).send('invalid token');
  }
}