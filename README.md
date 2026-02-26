# The Simple Plan - Phase 1 Extended - Sprint Tracker

A comprehensive 60-day sprint tracking dashboard for "The Simple Plan - Architecture Hardening & Validation Sprint" project. This application integrates with Google Sheets and Google Drive to provide real-time project management capabilities.

## Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **Live Google Sheets Integration** - Real-time data sync with your project Google Sheet
- **Dashboard Views**:
  - My Tasks (filtered by logged-in user)
  - All Tasks (complete Action Log)
  - Meeting Agendas (timeline with Fathom transcript links)
  - Decisions & Logs (with Risk Register and Change Order Tracker)
  - Analytics (sprint velocity, metrics, trends)
  - Phase 2 Parking Lot (idea tracking)
  - Settings (team directory, SOW details)
- **Print/PDF Export** - Export any view to PDF for documentation
- **Team Management** - View team members and their contact information
- **Status Tracking** - Update task statuses directly from the dashboard

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Google OAuth 2.0** for authentication
- **Google Sheets API** for data management
- **Lucide React** for icons

## Prerequisites

1. Google Cloud Project with APIs enabled
2. Google OAuth 2.0 credentials
3. Google Sheet with the required structure
4. Node.js 18+ and npm

## Google Cloud Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API

### 2. Configure OAuth Consent Screen

1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in the required fields:
   - App name: `TSP Sprint Tracker`
   - User support email: `creativehousestudios.sk@gmail.com`
   - Developer contact: `creativehousestudios.sk@gmail.com`
4. Add scopes:
   - `.../auth/spreadsheets` (Google Sheets API)
   - `.../auth/drive.readonly` (Google Drive API - read only)
5. Add test users: `creativehousestudios.sk@gmail.com` and any team member emails

### 3. Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Application type: **Web application**
4. Name: `TSP Sprint Tracker`
5. Authorized JavaScript origins:
   - `http://localhost:5173` (for local development)
   - `https://your-vercel-domain.vercel.app` (for production)
6. Authorized redirect URIs:
   - `http://localhost:5173`
   - `https://your-vercel-domain.vercel.app`
7. Click **Create** and save your:
   - Client ID
   - Client Secret (not needed for frontend, but keep it secure)

### 4. Create API Key

1. In **Credentials**, click **Create Credentials** > **API key**
2. Restrict the key:
   - Application restrictions: **HTTP referrers**
   - Add your domain and localhost
   - API restrictions: **Restrict key** > Select:
     - Google Sheets API
     - Google Drive API
3. Save the API key

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CHS-Labs/tsp-phase1-sprint-tracker.git
cd tsp-phase1-sprint-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=your-google-api-key
VITE_SPREADSHEET_ID=19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40
VITE_MEETING_FOLDER_ID=1g-S1oa3KwOkQVxipuvkY1CDRiMtbO2o2
```

Replace the placeholders with your actual Google Cloud credentials.

### 4. Add Video Background (Optional)

Place your video file `CHS Credibility Spine background.mp4` in the `public` folder at the root of the project.

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Google Sheet Structure

Your Google Sheet should have the following tabs with these column headers:

### SOW Master Deliverables
- Category | Refinement Item | Included in SOW? | Owner | Status | Acceptance Confirmed | Notes

### Action Log
- Task ID | Task Description | Related SOW Category | Owner | Source | Priority | Status | Due Date | Sprint Week | Notes | Linked Decision ID

### Weekly Meeting Log
- Meeting Date | Meeting Type | Zoom Link | Fathom Transcript Link | Summary | Action Items Extracted | Decisions Identified | Processed?

### Decisions Log
- Decision ID | Date | Decision Summary | Context | Approved By | Related SOW Section | Impact | Reversal Risk | Notes

### Parking Lot
- Idea | Raised By | Date | Related To | Impact Category | Suggested Phase | Reviewed?

### Validation Checklist
- Deliverable | Delivered? | Date Delivered | Reviewed By | Accepted? | Deficiency Identified? | Cure Completed?

### Analytics Baseline
- Metric | Baseline | Current | Trend | Notes

### Risk Register
- Risk | Probability | Impact | Owner | Mitigation

### Change Order Tracker
- Proposed Change | Date | Requires Written Change Order? | Status

### Team
- Name | Role | email | Phone

## Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel
```

Follow the prompts to:
- Link to existing project or create new
- Set project name: `tsp-phase1-sprint-tracker`
- Select the framework: Vite
- Set build command: `npm run build`
- Set output directory: `dist`

### 4. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** > **Environment Variables**
2. Add the following variables:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_GOOGLE_API_KEY`
   - `VITE_SPREADSHEET_ID`
   - `VITE_MEETING_FOLDER_ID`

### 5. Update OAuth Redirect URIs

Back in Google Cloud Console:
1. Add your Vercel URL to **Authorized JavaScript origins**
2. Add your Vercel URL to **Authorized redirect URIs**

### 6. Deploy to Production

```bash
vercel --prod
```

## Usage

### Signing In

1. Navigate to the application URL
2. Click "Sign in with Google"
3. Authorize the application to access your Google Sheets
4. You'll be redirected to the dashboard

### Dashboard Features

- **My Tasks**: View tasks assigned to your email (filtered by Owner column)
- **All Tasks**: View and filter all tasks in the Action Log
- **Meeting Agendas**: Timeline view of weekly meetings with links to Fathom transcripts
- **Decisions & Logs**: Track decisions, risks, validation, and change orders
- **Analytics**: View sprint metrics and trends
- **Parking Lot**: Capture ideas for Phase 2
- **Settings**: Team directory and project information

### Updating Data

- Task statuses can be updated directly from the dashboard
- Changes are immediately synced back to Google Sheets
- Click the refresh icon to manually sync data

### Exporting

Click the **Print** button on any page to:
- Save as PDF (select "Save as PDF" in print dialog)
- Print to paper (select printer)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── components/
│   ├── AllTasks/          # All tasks view
│   ├── Analytics/         # Analytics dashboard
│   ├── Auth/              # Login component
│   ├── Common/            # Shared components (FAB)
│   ├── Dashboard/         # Dashboard and My Tasks
│   ├── Decisions/         # Decisions & Logs
│   ├── Layout/            # Header, Sidebar, Hero
│   ├── MeetingAgendas/    # Meeting timeline
│   ├── ParkingLot/        # Phase 2 parking lot
│   └── Settings/          # Settings and team
├── contexts/
│   ├── AuthContext.tsx    # Authentication state
│   └── DataContext.tsx    # Google Sheets data
├── services/
│   └── googleSheetsService.ts  # API calls
├── types/
│   └── index.ts           # TypeScript types
├── data/
│   └── dummyData.ts       # Legacy dummy data
├── App.tsx                # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles
```

## Troubleshooting

### OAuth Error: "Access blocked"

- Ensure you've added the user's email to test users in OAuth consent screen
- Check that all required scopes are added
- Verify redirect URIs match exactly (including http/https and trailing slashes)

### "Failed to fetch" Errors

- Check that APIs are enabled in Google Cloud Console
- Verify API key restrictions aren't too strict
- Ensure the spreadsheet is shared with the appropriate Google account
- Check browser console for detailed error messages

### Data Not Loading

- Verify the `VITE_SPREADSHEET_ID` matches your Google Sheet
- Ensure column headers match exactly (case-sensitive)
- Check that the user has permission to access the Google Sheet
- Look for errors in the browser console

## License

Proprietary - Creative House Studios

## Support

For questions or issues:
- Email: creativehousestudios.sk@gmail.com
- Repository: https://github.com/CHS-Labs/tsp-phase1-sprint-tracker
