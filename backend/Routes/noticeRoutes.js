// backend/Routes/noticeRoutes.js
import express from 'express';
import Notice from '../Models/Notice.js';
import { verifyFirebaseToken } from '../middlewares/verifyFirebaseToken.js';

const router = express.Router();

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const notice = new Notice(req.body);
    const saved = await notice.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notice' });
  }
});

export default router;
