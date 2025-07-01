import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

if (!admin.apps.length) {
  try {
    console.log('🔐 Decoding FIREBASE_SERVICE_ACCOUNT_BASE64...');
    
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_BASE64 in .env');
    }

    // Decode base64 string to JSON string
    const decodedServiceAccountJSON = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      'base64'
    ).toString('utf8');

    const serviceAccount = JSON.parse(decodedServiceAccountJSON);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('✅ Firebase Admin Initialized');
  } catch (err) {
    console.error('❌ Firebase service account init failed.');
    console.error('💥 Error:', err.message);
    process.exit(1);
  }
}

export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};
