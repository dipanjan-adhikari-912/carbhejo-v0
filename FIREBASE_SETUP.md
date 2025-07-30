# 🔥 Complete Firebase Setup Guide for OTP Authentication

## 📋 Prerequisites
- Google account
- Node.js and npm installed
- React app ready

---

## 🚀 Step 1: Create Firebase Project

### 1.1 Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click **"Create a project"** or **"Add project"**

### 1.2 Project Setup
1. **Project name**: `carbhejo-v0`
2. **Google Analytics**: Enable (recommended for tracking)
3. **Analytics account**: Create new or use existing
4. Click **"Create project"**

### 1.3 Project Creation
- Wait for project creation (usually 1-2 minutes)
- Click **"Continue"** when ready

---

## 🔐 Step 2: Enable Phone Authentication

### 2.1 Navigate to Authentication
1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"** if prompted

### 2.2 Configure Phone Provider
1. Click **"Sign-in method"** tab
2. Find **"Phone"** in the list of providers
3. Click on **"Phone"** to configure

### 2.3 Enable Phone Auth
1. Click the **toggle switch** to enable Phone authentication
2. **Test phone numbers** (for development):
   - Add your phone number: `+919876543210`
   - Add additional test numbers if needed
3. Click **"Save"**

### 2.4 Important Notes
- Test phone numbers only work in development
- For production, remove test numbers
- Firebase will send real OTPs to test numbers

---

## ⚙️ Step 3: Get Firebase Configuration

### 3.1 Access Project Settings
1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**

### 3.2 Add Web App
1. Scroll down to **"Your apps"** section
2. Click **"Add app"** button
3. Select **"Web"** platform (</> icon)
4. **App nickname**: `carbhejo-web`
5. **Firebase Hosting**: Don't set up for now
6. Click **"Register app"**

### 3.3 Copy Configuration
1. Firebase will show your config object
2. Copy the entire config object
3. It looks like this:
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

---

## 🔧 Step 4: Configure Environment Variables

### 4.1 Create .env File
1. In your project root, create a file named `.env`
2. Add the following variables:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4.2 Example .env File
```bash
REACT_APP_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
REACT_APP_FIREBASE_AUTH_DOMAIN=carbhejo-v0.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=carbhejo-v0
REACT_APP_FIREBASE_STORAGE_BUCKET=carbhejo-v0.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

---

## 🛡️ Step 5: Configure reCAPTCHA

### 5.1 Enable reCAPTCHA
1. In Firebase Console, go to **Authentication** → **Settings**
2. Scroll down to **"reCAPTCHA Enterprise"**
3. Click **"Enable"**

### 5.2 Add Domains
1. **Development**: Add `localhost`
2. **Production**: Add your Netlify domain
3. Click **"Save"**

---

## 🧪 Step 6: Test Locally

### 6.1 Start Development Server
```bash
npm start
```

### 6.2 Test OTP Flow
1. Go to `http://localhost:3000`
2. Click **"Book Your Transport Now"**
3. Enter your test phone number (e.g., `9876543210`)
4. Click **"Send OTP"**
5. Check your phone for the OTP
6. Enter the OTP and verify

### 6.3 Troubleshooting
- **reCAPTCHA errors**: Check domain settings
- **OTP not received**: Verify phone number in Firebase Console
- **Build errors**: Check environment variables

---

## 🚀 Step 7: Deploy to Netlify

### 7.1 Add Environment Variables
1. Go to Netlify Dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add each Firebase variable:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`

### 7.2 Deploy
1. Push your code to GitHub
2. Netlify will auto-deploy
3. Test the live site

---

## 🔒 Step 8: Production Setup

### 8.1 Remove Test Numbers
1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Click **"Phone"**
3. Remove test phone numbers
4. Click **"Save"**

### 8.2 Configure SMS Provider
1. In Firebase Console, go to **Authentication** → **Settings**
2. **SMS provider**: Choose your preferred provider
3. Configure billing if required

### 8.3 Domain Verification
1. Add your production domain to reCAPTCHA settings
2. Verify domain ownership if required

---

## 📱 Step 9: Phone Number Format

### 9.1 Supported Formats
- **With country code**: `+919876543210`
- **Without country code**: `9876543210` (defaults to +91)
- **International**: `+1234567890`

### 9.2 Country Code Default
- The app defaults to India (+91)
- Users can enter numbers with or without country code

---

## 🐛 Common Issues & Solutions

### Issue 1: "reCAPTCHA not found"
**Solution**: Check domain settings in Firebase Console

### Issue 2: "Invalid phone number"
**Solution**: Ensure phone number is in test numbers list

### Issue 3: "OTP expired"
**Solution**: Request new OTP (resend functionality)

### Issue 4: "Build fails"
**Solution**: Check environment variable names and values

### Issue 5: "Authentication failed"
**Solution**: Verify Firebase configuration and network connection

---

## 📊 Firebase Pricing

### Free Tier Limits
- **Phone Auth**: 10,000 verifications/month
- **reCAPTCHA**: Unlimited
- **Storage**: 1GB
- **Database**: 1GB

### Paid Plans
- **Blaze Plan**: Pay-as-you-go
- **Phone Auth**: $0.01 per verification after free tier
- **SMS**: Varies by provider

---

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Phone Auth Guide](https://firebase.google.com/docs/auth/web/phone-auth)
- [reCAPTCHA Setup](https://firebase.google.com/docs/auth/web/recaptcha)

---

## ✅ Checklist

- [ ] Firebase project created
- [ ] Phone authentication enabled
- [ ] Test phone numbers added
- [ ] Web app registered
- [ ] Configuration copied
- [ ] Environment variables set
- [ ] reCAPTCHA enabled
- [ ] Local testing successful
- [ ] Netlify deployment configured
- [ ] Production settings updated

---

## 🎉 Success!

Once you complete all steps, your OTP authentication will be fully functional with:
- ✅ Secure phone verification
- ✅ reCAPTCHA protection
- ✅ Session management
- ✅ Error handling
- ✅ Production ready 