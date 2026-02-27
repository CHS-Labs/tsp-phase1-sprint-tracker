# Google Sheet Update Instructions
**DO THIS FIRST - Before Running Meeting Processor**

## Open Your Control Center Spreadsheet

URL: https://docs.google.com/spreadsheets/d/19rMQWca1J9h-VG4cekafkK0AYmF2hiEORAzNaDtkB40/edit

---

## Step 1: Update "Weekly Meeting Log" Tab

**Click on the "Weekly Meeting Log" tab**

**Add these columns AFTER "Processed?" (Column H):**

| Column | Header Name | Example Value |
|--------|-------------|---------------|
| I | Meeting ID | 2026-03-05-01 |
| J | Review Doc Link | https://docs.google.com/document/d/... |
| K | Final Summary Link | https://docs.google.com/document/d/... |
| L | Status | Committed |
| M | Decisions Created Count | 2 |
| N | Tasks Created Count | 8 |

**To add columns:**
1. Right-click on column H header
2. Select "Insert 6 columns right"
3. Type the headers above into row 1

---

## Step 2: Create New Tab "Meeting Discussion Notes"

**Create the new tab:**
1. Click the "+" button at bottom left (next to existing tabs)
2. Rename it to: `Meeting Discussion Notes`

**Add these column headers in row 1:**

| Column | Header Name | Example Value |
|--------|-------------|---------------|
| A | Meeting ID | 2026-03-05-01 |
| B | Meeting Date | 2026-03-05 |
| C | Section Number | 1 |
| D | Section Title | Opening + Intent |
| E | Discussion Summary | Discussed unified understanding of phased process... |
| F | Key Points | • Agreement critical\n• No brainstorming during hardening |
| G | Related Decision IDs | D-2026-03-05-01, D-2026-03-05-02 |
| H | Related Task IDs | 1.1, 1.2 |
| I | Follow-Up Required | No |
| J | Parking Lot Item Created | No |

**Format the header row:**
- Select row 1
- Bold text
- Background color: Light gray
- Freeze row 1: View → Freeze → 1 row

---

## Step 3: Update "Decisions Log" Tab

**Click on the "Decisions Log" tab**

**Add these columns AFTER "Notes" (Column I):**

| Column | Header Name | Example Value |
|--------|-------------|---------------|
| J | Source Meeting ID | 2026-03-05-01 |
| K | Source Meeting Date | 2026-03-05 |
| L | Linked Task IDs | 1.1, 1.2, 2.1 |
| M | Status | Approved |

**To add columns:**
1. Right-click on column I header
2. Select "Insert 4 columns right"
3. Type the headers above into row 1

---

## Step 4: Update "Action Log" Tab

**Click on the "Action Log" tab**

**Add these columns AFTER "Linked Decision ID" (Column K):**

| Column | Header Name | Example Value |
|--------|-------------|---------------|
| L | Source Meeting ID | 2026-03-05-01 |
| M | Source Meeting Date | 2026-03-05 |
| N | Section Category | 1 |
| O | Deferred to Phase 2 | No |
| P | Duplicate Check Status | Reviewed |

**To add columns:**
1. Right-click on column K header
2. Select "Insert 5 columns right"
3. Type the headers above into row 1

---

## Step 5: Update Type Definitions (For Tech Reference)

**File:** `src/types/index.ts`

**Add these new interfaces:**

```typescript
// Meeting-related types
export interface MeetingRecord {
  meetingId: string;
  meetingDate: string;
  meetingType: string;
  zoomLink: string;
  fathomTranscriptLink: string;
  summary: string;
  actionItemsExtracted: string;
  decisionsIdentified: string;
  processed: string;
  reviewDocLink: string;
  finalSummaryLink: string;
  status: 'Recorded' | 'Extracted' | 'Reviewed' | 'Committed';
  decisionsCreatedCount: number;
  tasksCreatedCount: number;
}

export interface MeetingSectionNote {
  meetingId: string;
  meetingDate: string;
  sectionNumber: number;
  sectionTitle: string;
  discussionSummary: string;
  keyPoints: string;
  relatedDecisionIds: string;
  relatedTaskIds: string;
  followUpRequired: string;
  parkingLotItemCreated: string;
}

// Updated Decision with new fields
export interface Decision {
  decisionId: string;
  date: string;
  decisionSummary: string;
  context: string;
  approvedBy: string;
  relatedSOWSection: string;
  impact: string;
  reversalRisk: string;
  notes: string;
  sourceMeetingId: string;      // NEW
  sourceMeetingDate: string;    // NEW
  linkedTaskIds: string;        // NEW
  status: string;               // NEW
}

// Updated ActionLogTask with new fields
export interface ActionLogTask {
  taskId: string;
  taskDescription: string;
  relatedSOWCategory: string;
  owner: string;
  source: string;
  priority: string;
  status: string;
  dueDate: string;
  sprintWeek: string;
  notes: string;
  linkedDecisionId: string;
  sourceMeetingId: string;      // NEW
  sourceMeetingDate: string;    // NEW
  sectionCategory: string;      // NEW
  deferredToPhase2: string;     // NEW
  duplicateCheckStatus: string; // NEW
}
```

---

## Step 6: Update SHEET_NAMES Constant

**File:** `src/types/index.ts`

**Update the SHEET_NAMES constant to include new tab:**

```typescript
export const SHEET_NAMES = {
  SOW_DELIVERABLES: 'SOW Master Deliverables',
  ACTION_LOG: 'Action Log',
  MEETING_LOG: 'Weekly Meeting Log',
  MEETING_NOTES: 'Meeting Discussion Notes',  // NEW
  DECISIONS: 'Decisions Log',
  PARKING_LOT: 'Parking Lot – Phase 2',
  VALIDATION: 'Validation Checklist',
  ANALYTICS: 'Analytics Baseline',
  RISK_REGISTER: 'Risk Register',
  CHANGE_ORDERS: 'Change Order Tracker',
  TEAM: 'Team',
} as const;
```

---

## Verification Checklist

After making all changes, verify:

- [ ] Weekly Meeting Log has 14 columns (A through N)
- [ ] Meeting Discussion Notes tab exists with 10 columns
- [ ] Decisions Log has 13 columns (A through M)
- [ ] Action Log has 16 columns (A through P)
- [ ] All header rows are formatted (bold, gray background)
- [ ] All tabs have row 1 frozen

---

## What This Enables

✅ Meeting processor can write extracted data to structured locations
✅ Full traceability: Meeting → Discussion → Decision → Task
✅ Deduplication checking against existing tasks
✅ Glen's review workflow with pending/committed status
✅ Interface can display meeting flow and decision impact maps

---

**Once you've completed these steps, you're ready to run the meeting processor!**
