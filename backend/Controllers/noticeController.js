// backend/Controllers/noticeController.js
import Notice from '../Models/Notice.js';

export const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = new Notice({ title, content });
    const saved = await notice.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notice' });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};
