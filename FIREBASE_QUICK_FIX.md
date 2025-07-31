# 🔥 Quick Fix for Firebase API Key Error

## 🚨 Current Issue
You're getting a "API key not valid" error because Firebase is not properly configured.

## ✅ Quick Solution

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Name it: `carbhejo-v0`
4. Follow the setup wizard

### Step 2: Get Your Firebase Config
1. In Firebase Console, click the gear icon ⚙️ (Project Settings)
2. Scroll down to "Your apps" section
3. Click "Add app" → Select "Web" (</>)
4. Register app with nickname: `carbhejo-web`
5. Copy the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "carbhejo-v0.firebaseapp.com",
  projectId: "carbhejo-v0",
  storageBucket: "carbhejo-v0.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 3: Create Environment File
1. In your project root, create a file named `.env`
2. Add your Firebase config values:

```bash
REACT_APP_FIREBASE_API_KEY=your_actual_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Step 4: Enable Phone Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Phone" provider
5. Add your phone number as a test number: `+919876543210`

### Step 5: Restart Your App
```bash
npm start
```

## 🔧 Alternative: Use Demo Mode
If you want to test the app without Firebase for now:
- The app will show a warning but won't crash
- Authentication features will be disabled
- You can still see the UI and navigation

## 📞 Need Help?
- Check the full setup guide: `FIREBASE_SETUP.md`
- Make sure your `.env` file is in the project root
- Restart the development server after creating `.env`
- Never commit `.env` to Git (it's already in `.gitignore`)

## ✅ Success Indicators
- No more "API key not valid" errors in console
- Firebase warning disappears
- Authentication features work properly 