# Data Connections Documentation

## Overview
This application uses **Google Sheets API** and **Google Drive API** with **API key authentication** (read-only, no OAuth required).

## Environment Variables

Located in: `.env` (NOT committed to git, Vercel needs these set)

```env
VITE_GOOGLE_API_KEY=AIzaSyAq-ADpF5UbACMH9GO6KV0W1IOvPIYPvh4
VITE_SPREADSHEET_ID=19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40
VITE_MEETING_FOLDER_ID=1g-S1oa3KwOkQVxipuvkY1CDRiMtbO2o2
VITE_USER_FEEDBACK_FOLDER_ID=1CHO5TddbhWG9hUlRAQI9HSy1Tgxc_cqt
```

## Data Sources

### Google Sheets (Control Center)
**Spreadsheet ID:** `19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40`
**URL:** https://docs.google.com/spreadsheets/d/19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40/edit

**Tabs Used:**
- `SOW Master Deliverables` → SOWDeliverables
- `Action Log` → Tasks (used by AllTasks, MyTasksTable, Dashboard)
- `Weekly Meeting Log` → Meetings
- `Decisions Log` → Decisions (used by DecisionsAndLogs)
- `Parking Lot` → Parking Lot Ideas
- `Validation Checklist` → Validation Items (used by DecisionsAndLogs)
- `Analytics Baseline` → Analytics
- `Risk Register` → Risks (used by DecisionsAndLogs)
- `Change Order Tracker` → Change Orders (used by DecisionsAndLogs)
- `Team` → Team Members (used by TeamWidget, Settings)

### Google Drive - Meeting Agendas
**Folder ID:** `1g-S1oa3KwOkQVxipuvkY1CDRiMtbO2o2`
**URL:** https://drive.google.com/drive/u/1/folders/1g-S1oa3KwOkQVxipuvkY1CDRiMtbO2o2

**Used By:** `MeetingAgendas.tsx`
Lists all Google Docs/files in this folder, displays them in a timeline view.

### Google Drive - User Feedback Reports
**Folder ID:** `1CHO5TddbhWG9hUlRAQI9HSy1Tgxc_cqt`
**URL:** https://drive.google.com/drive/u/1/folders/1CHO5TddbhWG9hUlRAQI9HSy1Tgxc_cqt

**Used By:** `UserFeedback.tsx`
Lists all user session feedback reports, displays them in a grid layout.

## Service Files

### `src/services/googleSheetsService.ts`
- Fetches data from Google Sheets using API key
- No authentication required (read-only access)
- Parses each sheet tab into typed data structures
- Used by `DataContext`

### `src/services/googleDriveService.ts`
- Lists files in Google Drive folders using API key
- No authentication required (public/shared folders)
- Used by `MeetingAgendas.tsx` and `UserFeedback.tsx`

## Data Flow

```
1. App Loads → main.tsx wraps App with DataProvider
2. DataContext mounts → useEffect triggers refreshData()
3. refreshData() calls googleSheetsService for ALL sheet tabs
4. Data stored in DataContext state (tasks, decisions, risks, team, etc.)
5. Components use useData() hook to access data
6. MeetingAgendas/UserFeedback call googleDriveService directly
```

## Component → Data Mapping

| Component | Data Source | Hook/Service Used |
|-----------|-------------|-------------------|
| Dashboard | Google Sheets (multiple tabs) | `useData()` |
| AllTasks | Google Sheets → Action Log | `useData()` → tasks |
| MyTasksTable | Google Sheets → Action Log | `useData()` → tasks |
| MeetingAgendas | Google Drive → Meeting Folder | `googleDriveService.listFilesInFolder()` |
| DecisionsAndLogs | Google Sheets → Decisions/Risks/Validation/Change Orders | `useData()` → decisions, risks, validationChecklist, changeOrders |
| UserFeedback | Google Drive → User Feedback Folder | `googleDriveService.listFilesInFolder()` |
| TeamWidget | Google Sheets → Team | `useData()` → team |
| Settings | Google Sheets → Team | `useData()` → team |
| Analytics | Google Sheets → Analytics Baseline | `useData()` → analytics |
| ParkingLot | Google Sheets → Parking Lot | `useData()` → parkingLot |

## Key Points

### NO OAUTH REQUIRED
The app uses **API key authentication only**. This means:
- ✅ Data loads immediately on page load
- ✅ No login/authentication flow needed
- ✅ Read-only access to shared/public Google resources
- ❌ Cannot write/update data (future feature would need OAuth)

### Authentication Context
The `AuthContext` exists for **future features** but is NOT required for current data loading.

### Vercel Deployment
When deploying to Vercel, add these environment variables in project settings:
- `VITE_GOOGLE_API_KEY`
- `VITE_SPREADSHEET_ID`
- `VITE_MEETING_FOLDER_ID`
- `VITE_USER_FEEDBACK_FOLDER_ID`

### Google Drive Folder Permissions
Both Drive folders must be set to "Anyone with the link can view" for API key access to work.

## Troubleshooting

### No Data Showing
1. Check `.env` file exists with all 4 variables
2. Restart dev server after changing `.env`
3. Check browser console for API errors
4. Verify Google Sheets/Drive folders are shared publicly

### API Quota Exceeded
Google Sheets API has rate limits. If exceeded:
- Wait 60 seconds
- Consider caching data in localStorage

### 403 Forbidden Errors
- Google Sheets: Make sure spreadsheet is shared (view access)
- Google Drive: Make sure folders are shared (view access)
- Verify API key is enabled for both Sheets and Drive APIs in Google Cloud Console

## Last Updated
2026-02-26 - Removed authentication requirement, added comprehensive documentation
