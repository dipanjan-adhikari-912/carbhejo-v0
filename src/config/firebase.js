import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if environment variables are available
const hasValidConfig = process.env.REACT_APP_FIREBASE_API_KEY && 
                      process.env.REACT_APP_FIREBASE_AUTH_DOMAIN &&
                      process.env.REACT_APP_FIREBASE_PROJECT_ID;

const firebaseConfig = hasValidConfig ? {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
} : {
  // Fallback config to prevent errors (replace with your actual Firebase config)
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo123"
};

// Initialize Firebase only if we have valid config
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  if (!hasValidConfig) {
    console.warn('⚠️ Firebase not properly configured. Please set up your environment variables.');
    console.warn('📖 See FIREBASE_SETUP.md for instructions.');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  // Create mock objects to prevent app crashes
  auth = null;
  db = null;
}

export { auth, db };
export default app; 