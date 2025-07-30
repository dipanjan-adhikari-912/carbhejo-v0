# Firebase Setup Instructions for OTP Authentication

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `carbhejo-v0`
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Phone Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Phone** provider
3. Enable it by clicking the toggle
4. Add your test phone numbers (for development)
5. Click **Save**

## 3. Get Your Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** → **Web** (</>)
4. Register app with name: `carbhejo-web`
5. Copy the Firebase config object

## 4. Set Environment Variables

Create a `.env` file in your project root with:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 5. Enable reCAPTCHA

1. In Firebase Console, go to **Authentication** → **Settings**
2. Scroll to **reCAPTCHA Enterprise**
3. Enable **reCAPTCHA Enterprise**
4. Add your domain (localhost for development)

## 6. Test the Setup

1. Run `npm start` to start development server
2. Go to home page and click "Book Your Transport Now"
3. Enter a phone number (use test numbers from step 2)
4. You should receive an OTP
5. Verify the OTP to complete authentication

## 7. Deploy to Netlify

When deploying to Netlify, add the environment variables in:
1. Netlify Dashboard → Your Site → **Site settings** → **Environment variables**
2. Add all the Firebase environment variables from step 4

## 8. Production Setup

For production:
1. Remove test phone numbers from Firebase Console
2. Configure proper SMS provider in Firebase
3. Set up proper domain in reCAPTCHA settings

## Notes

- Firebase Phone Auth includes reCAPTCHA verification
- Test phone numbers work only in development
- For production, you'll need to verify your app with Firebase
- The app defaults to India (+91) country code 