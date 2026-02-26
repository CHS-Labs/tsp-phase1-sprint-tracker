# Quick Setup Guide

## ✅ What We Have

- ✅ Google OAuth Client ID (configured in .env)
- ✅ Google OAuth Client Secret (not needed for frontend)
- ⏳ Google API Key: **NEEDED**

## 🔑 Step 1: Create Google API Key

1. Go to [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials?project=tsp-sow-1735776976027)
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. A key will be created - click **"RESTRICT KEY"**
5. Under **"API restrictions"**:
   - Select "Restrict key"
   - Check ✓ **Google Sheets API**
   - Check ✓ **Google Drive API**
6. Under **"Application restrictions"**:
   - Select "HTTP referrers (web sites)"
   - Add these URLs:
     - `http://localhost:5173/*`
     - `https://tsp-phase1-sprint-tracker.vercel.app/*`
7. Click **"SAVE"**
8. Copy the API key

## 🔐 Step 2: Update OAuth Settings

1. Go to [OAuth 2.0 Client IDs](https://console.cloud.google.com/apis/credentials?project=tsp-sow-1735776976027)
2. Click on your OAuth client: **"TSP SOW"** or the Client ID we have
3. Under **"Authorized JavaScript origins"**, add:
   - `http://localhost:5173`
   - `https://tsp-phase1-sprint-tracker.vercel.app`
4. Under **"Authorized redirect URIs"**, add:
   - `http://localhost:5173`
   - `https://tsp-phase1-sprint-tracker.vercel.app`
5. Click **"SAVE"**

## 👥 Step 3: Enable APIs (if not already done)

1. Go to [API Library](https://console.cloud.google.com/apis/library?project=tsp-sow-1735776976027)
2. Search and enable:
   - **Google Sheets API**
   - **Google Drive API**

## 📧 Step 4: OAuth Consent Screen - Add Test Users

1. Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent?project=tsp-sow-1735776976027)
2. Scroll to **"Test users"**
3. Click **"+ ADD USERS"**
4. Add these emails:
   - `creativehousestudios.sk@gmail.com`
   - Any other team member emails from your Team tab
5. Click **"SAVE"**

## 📊 Step 5: Share Google Sheet

Make sure your Google Sheet is shared with the OAuth email:
1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40/edit)
2. Click **"Share"**
3. Add: `creativehousestudios.sk@gmail.com` (and team members)
4. Set permission to **"Editor"** or **"Viewer"** (Editor if you want status updates to sync back)
5. Click **"Send"**

## 🚀 Step 6: Once You Have the API Key

Send me the API key and I'll:
1. Update your local `.env` file
2. Configure Vercel environment variables
3. Redeploy the production site
4. Test the OAuth flow

---

## 📋 Current Status

**Local Environment (.env):**
```
VITE_GOOGLE_CLIENT_ID=[CONFIGURED]
VITE_GOOGLE_API_KEY=[WAITING FOR API KEY]
VITE_SPREADSHEET_ID=19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40
VITE_MEETING_FOLDER_ID=1g-S1oa3KwOkQVxipuvkY1CDRiMtbO2o2
```

**Vercel Environment Variables:**
- Need to be configured once we have the API key

**GitHub Repo:**
- https://github.com/CHS-Labs/tsp-phase1-sprint-tracker

**Vercel Production:**
- https://tsp-phase1-sprint-tracker.vercel.app
