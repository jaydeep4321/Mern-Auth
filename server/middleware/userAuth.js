import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json({ message: 'Not Authorized. Login Again' });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        status: false,
        message: 'Not Authorized. Login Again',
      });
    }

    next();
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export default userAuth;
