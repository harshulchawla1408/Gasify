import express from 'express';
import { verifyFirebaseToken } from '../middlewares/verifyFirebaseToken.js';
import { saveUserToMongo } from '../Controllers/userController.js';

const router = express.Router();

router.post('/', verifyFirebaseToken, saveUserToMongo);

export default router;
