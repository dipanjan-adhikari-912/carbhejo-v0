# 🚀 Firebase Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Create Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Create project" → Name: `carbhejo-v0`
- Enable Analytics (optional)

### 2. Enable Phone Auth
- Authentication → Sign-in method → Phone
- Enable toggle
- Add test number: `+919876543210`
- Save

### 3. Get Config
- Project Settings (⚙️) → Add app → Web
- App name: `carbhejo-web`
- Copy config object

### 4. Set Environment Variables
Create `.env` file:
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5. Test
```bash
npm start
# Go to localhost:3000
# Click "Book Transport"
# Enter test phone number
# Verify OTP
```

## 🔑 Key Points

- **Test numbers**: Only work in development
- **reCAPTCHA**: Automatically handled
- **Country code**: Defaults to +91 (India)
- **Free tier**: 10,000 verifications/month

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| reCAPTCHA error | Check domain in Firebase Console |
| OTP not received | Verify phone in test numbers |
| Build fails | Check .env variable names |
| Auth fails | Verify Firebase config |

## 📞 Test Phone Numbers

Add these to Firebase Console for testing:
- `+919876543210`
- `+919876543211`
- `+919876543212`

## 🚀 Deploy to Netlify

1. Add environment variables in Netlify dashboard
2. Push code to GitHub
3. Netlify auto-deploys
4. Test live site

---

**Need more details?** See `FIREBASE_SETUP.md` for complete guide. 