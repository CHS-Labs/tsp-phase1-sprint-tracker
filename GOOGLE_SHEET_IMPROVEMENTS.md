# Google Sheet Improvements for TSP Sprint Tracker

**Date:** 2026-02-27
**Purpose:** Capture meeting discussions, link decisions to tasks, improve traceability

## Missing Punch List Items

Add these to Action Log immediately:

### Section 1: Left/Right Clarity & Teaching

**Task 1.1**
- **ID:** 1.1
- **Description:** Integrate full Left-to-Right explanatory text (pause/admit/choose, character formation) aligned with Ken avatar teaching module
- **Category:** Left/Right Clarity & Teaching
- **Owner:** [TBD]
- **Priority:** High
- **Status:** Not Started
- **Source:** 2026-03-05 Meeting Punch List
- **Notes:** Ken avatar already produced: https://app.heygen.com/videos/12824c8810a24f6786efa3dbbfe9ea04

**Task 1.2**
- **ID:** 1.2
- **Description:** Ensure Ken avatar visibility and placement as primary teacher without forced onboarding loop
- **Category:** Left/Right Clarity & Teaching
- **Owner:** [TBD]
- **Priority:** High
- **Status:** Not Started
- **Notes:** Must be invitational, not gatekeeping

### Section 2: Video & Content Discoverability

**Task 2.1**
- **ID:** 2.1
- **Description:** Elevate 17 core teaching videos and improve discoverability while maintaining homepage clarity
- **Category:** Video & Content Discoverability
- **Owner:** [TBD]
- **Priority:** Medium
- **Status:** Not Started
- **Notes:** Move from buried book page to primary access. Requires UX review.

### Section 3: Web App Discoverability

**Task 3.1**
- **ID:** 3.1
- **Description:** Create onboarding micro-instruction to explain web app save-to-home-screen process and re-send to existing invitees
- **Category:** Onboarding
- **Owner:** [TBD]
- **Priority:** High
- **Status:** Not Started
- **Notes:** Users struggle to "find" app later

### Section 4: One-Pager Integration

**Task 4.1**
- **ID:** 4.1
- **Description:** Integrate one-pager content into the app reading section with proper formatting and downloadable materials
- **Category:** One-Pager Integration
- **Owner:** [TBD]
- **Priority:** Medium
- **Status:** Not Started

### Section 5: Content Accuracy Corrections

**Task 5.1**
- **ID:** 5.1
- **Description:** Decide on updating "Full Chapters" language for clarity or expanding content to full chapters
- **Category:** Content Accuracy
- **Owner:** [TBD]
- **Priority:** Low
- **Status:** Not Started

**Task 5.2**
- **ID:** 5.2
- **Description:** Confirm feasibility and correct formatting of Step 6 chart
- **Category:** Content Accuracy
- **Owner:** [TBD]
- **Priority:** Low
- **Status:** Not Started

**Task 5.3**
- **ID:** 5.3
- **Description:** Remove or reposition "Made in Bolt" overlay obstructing profile button
- **Category:** Content Accuracy
- **Owner:** [TBD]
- **Priority:** Low
- **Status:** Not Started

**Task 6.1**
- **ID:** 6.1
- **Description:** Validate analytics instrumentation and baseline reporting (unique users, active users, step progression, Left/Right engagement, flow integrity)
- **Category:** Analytics & Reporting
- **Owner:** [TBD]
- **Priority:** High
- **Status:** Not Started

## New Tab Needed: "Meeting Discussion Notes"

**Purpose:** Capture structured discussion notes per meeting section

**Columns:**
- Meeting Date
- Meeting ID (format: YYYY-MM-DD-##)
- Section Number (1-6)
- Section Title
- Discussion Summary
- Key Points Raised
- Related Decision IDs (comma-separated)
- Related Task IDs (comma-separated)
- Follow-Up Required (Yes/No)
- Parking Lot Item Created (Yes/No)

**Example Row:**
```
2026-03-05 | 2026-03-05-01 | 1 | Opening + Intent | Discussed unified understanding of phased process and importance of defining goals clearly | Agreement critical for tech to move ahead, no brainstorming during hardening | D-001, D-002 | 1.1, 1.2 | No | No
```

## Enhanced Weekly Meeting Log Columns

**Add these columns to existing tab:**
- Meeting ID (unique identifier)
- Agenda Document Link (to Google Drive)
- Section 1 Summary
- Section 2 Summary
- Section 3 Summary
- Section 4 Summary
- Section 5 Summary
- Section 6 Summary
- Decisions Count (auto-calculated)
- Tasks Created Count (auto-calculated)

## Enhanced Decisions Log Columns

**Add these columns:**
- Source Meeting ID (which meeting created this)
- Source Meeting Date
- Linked Task IDs (tasks created from this decision)
- Status (Proposed, Approved, Implemented, Rejected)

## Enhanced Action Log Columns

**Add these columns:**
- Source Meeting ID (if from meeting)
- Source Meeting Date
- Linked Decision ID (if spawned from decision)
- Section Category (matches punch list sections: 1-6)
- Deferred to Phase 2 (Yes/No)

## Interface Improvements Needed

### 1. Meeting Flow View (New Component)

**Location:** New tab "Meeting Summaries"

**Features:**
- Shows recent meetings in timeline
- Click meeting → Expand to show:
  - All 6 sections
  - Discussion notes per section
  - Decisions made
  - Tasks created
  - Parking lot items added
- Visual linking: Meeting → Decision → Tasks

### 2. Dashboard Enhancement

**Add "Recent Meetings" widget showing:**
```
📅 Last 3 Meetings
├─ Mar 5, 2026 - Phase 1 Punch List Review
│  └─ 8 new tasks, 2 decisions, 3 parking lot items
├─ Feb 27, 2026 - Hardening Kickoff
│  └─ 5 new tasks, 4 decisions
└─ Feb 20, 2026 - SOW Final Review
   └─ 2 decisions confirmed
```

### 3. Decision-Task Linkage View

**Show traceability:**
```
Decision D-001: "Left/Right explanation must be full, not abbreviated"
├─ Made in: 2026-03-05 Meeting, Section 1
├─ Context: Ken's avatar teaching must be comprehensive
└─ Spawned Tasks:
   ├─ 1.1 - Integrate full L/R text
   └─ 1.2 - Position Ken avatar properly
```

## Implementation Priority

**Phase 1 (This Week):**
1. ✅ Add punch list items 1.1-6.1 to Action Log
2. ✅ Create "Meeting Discussion Notes" tab
3. ✅ Add linking columns to Decisions and Action Log

**Phase 2 (Next Sprint):**
1. Add Meeting Flow View component to interface
2. Add Recent Meetings widget to Dashboard
3. Add Decision-Task linkage visualization

**Phase 3 (Future):**
1. Auto-extract tasks/decisions from meeting notes (AI-assisted)
2. Meeting recording integration
3. Searchable meeting archive

## Best Practice: Post-Meeting Protocol

**Within 24 hours of every meeting:**

1. **Meeting Lead (Glen) creates:**
   - Meeting record in Weekly Meeting Log
   - Agenda document in Drive folder
   - Meeting ID: YYYY-MM-DD-##

2. **Note Taker creates:**
   - 6 rows in Meeting Discussion Notes (one per section)
   - Extracts all decisions → Decisions Log
   - Extracts all tasks → Action Log
   - Updates Parking Lot tab with deferred items

3. **Tech Lead (Shelly) reviews:**
   - All new tasks have owners assigned
   - All tasks have proper linking (meeting ID, decision ID)
   - Status is accurate

4. **Everyone can see:**
   - Meeting flow in interface
   - What was discussed
   - What was decided
   - What tasks were created
   - Full traceability

---

**This creates a complete audit trail:**
Meeting → Sections → Discussions → Decisions → Tasks → Completion
