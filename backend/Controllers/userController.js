import User from '../Models/User.js';

export const saveUserToMongo = async (req, res) => {
  const { name, email } = req.body;
  const uid = req.user.uid;

  try {
    const exists = await User.findOne({ uid });
    if (exists) return res.status(200).json({ message: 'User already exists' });

    const newUser = new User({ uid, name, email });
    await newUser.save();
    res.status(201).json({ message: 'User saved' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};
