# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `carbhejo-v0`
   - Database Password: (create a strong password)
   - Region: (choose closest to your users)
6. Click "Create new project"

## 2. Enable Phone Auth

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Scroll down to **Phone Auth**
3. Enable **Enable phone confirmations**
4. Save changes

## 3. Get Your API Keys

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## 4. Set Environment Variables

Create a `.env` file in your project root with:

```
REACT_APP_SUPABASE_URL=your_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Test the Setup

1. Run `npm start` to start the development server
2. Go to the home page
3. Click "Book Your Transport Now"
4. You should be redirected to the auth page
5. Enter a phone number and test OTP functionality

## 6. Deploy to Netlify

When deploying to Netlify, add the environment variables in:
1. Netlify Dashboard → Your Site → **Site settings** → **Environment variables**
2. Add:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

## Notes

- For development, you can use any phone number
- For production, you'll need to configure SMS provider in Supabase
- The app defaults to India (+91) country code 