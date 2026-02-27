# Interface Audit & Recommendations

**Date:** February 26, 2026
**Current Status:** Production site live at https://tsp-phase1-sprint-tracker.vercel.app
**Context:** Meeting processor backend complete, now focusing on interface improvements

---

## 🔍 CURRENT STATE ANALYSIS

### What's Working ✅

1. **Clean layout** - Sidebar navigation, collapsible design
2. **Data connection** - Successfully pulling from Google Sheets (9 tasks, 7 team members confirmed)
3. **Responsive filtering** - All Tasks page has good filters (owner, category, priority, status)
4. **Visual timeline** - Meeting Agendas page has attractive timeline view
5. **Tabbed organization** - Decisions & Logs has clean tab navigation
6. **Print functionality** - Present on multiple pages
7. **Brand colors** - Orange (#E98A24) and blue (#1A9CD7) consistently used

### Critical Issues 🚨

1. **NO MEETING FLOW VIEW** - The most important feature for the new workflow is missing
   - Users can't see: Meeting → Discussions → Decisions → Tasks flow
   - No way to visualize traceability chain
   - **Impact:** HIGH - Core workflow not represented in interface

2. **Dashboard is too basic** - Doesn't show Glen what he needs most
   - Missing: Recent meetings widget
   - Missing: Decision-Task linkage visualization
   - Missing: Pending review items
   - Current: Just task summary + task table + team widget
   - **Impact:** HIGH - Primary view doesn't serve primary user needs

3. **Meeting Agendas page is incomplete** - Shows files but not meeting content
   - No meeting summaries
   - No section breakdowns
   - No link to decisions/tasks from meetings
   - Just a list of Google Doc files
   - **Impact:** MEDIUM - Can't review meeting outcomes

4. **No task detail view** - Clicking tasks does nothing
   - Can't see full task details
   - Can't see linked decision
   - Can't see source meeting
   - Can't edit status inline
   - **Impact:** MEDIUM - Have to go to Google Sheets for details

5. **No decision detail view** - Similar issue
   - Can't see linked tasks
   - Can't see source meeting
   - Can't expand for more info
   - **Impact:** MEDIUM - Limited usefulness

### Minor Issues ⚠️

1. **Hero banner takes up space** - Big banner on dashboard that can be hidden
   - **Fix:** Make it dismissible (already has hide button) but default to hidden after first visit

2. **Floating Action Button unclear** - Shows a + button but purpose not obvious
   - **Fix:** Either remove or make it do something useful (like "Add Quick Task")

3. **Search bar in header not working** - Header has search but it does nothing
   - **Fix:** Either implement or remove

4. **No empty state guidance** - When tabs are empty, just says "No items"
   - **Fix:** Add helpful guidance: "Items will appear here after meetings are processed"

5. **Sprint timeline is hardcoded** - Shows "Day 21 of 60" and "35%" but appears static
   - **Fix:** Calculate from real dates or remove

6. **No loading skeleton states** - Just spinner, then pop-in
   - **Fix:** Add skeleton loaders for smoother UX

### Missing Features (Now Critical) 🆕

Given the meeting processor workflow, these are now CRITICAL missing pieces:

1. **Meeting Flow View** (NEW TAB NEEDED)
   - Timeline of meetings
   - Click to expand meeting details
   - Show 6 sections per meeting
   - Show decisions from each section
   - Show tasks from each section
   - Show parking lot items identified
   - Visual flow: Meeting → Section → Decision → Tasks

2. **Dashboard Recent Meetings Widget** (ADDITION TO DASHBOARD)
   - Last 3-5 meetings
   - Quick stats: X decisions, Y tasks, Z parking lot items
   - Click to see meeting details

3. **Decision-Task Linkage View** (ADDITION TO DECISIONS TAB)
   - Show which tasks spawned from which decisions
   - Show which meeting the decision came from
   - Tree view or graph visualization

4. **Pending Review Indicator** (DASHBOARD ALERT)
   - Show when meeting extraction is pending Glen's review
   - Link to review document
   - Show count of items needing review

---

## 📋 PRIORITIZED RECOMMENDATIONS

### **PHASE 1: CRITICAL (Do Now)** 🔥

#### 1. Create "Meeting Flow" Tab

**Why:** This is the centerpiece of the new workflow. Glen needs to see the full meeting → decision → task chain.

**What to build:**
```
Meeting Flow Tab (replace or enhance "Meeting Agendas")
├─ Timeline of meetings (most recent first)
├─ Each meeting card shows:
│  ├─ Meeting date, ID, attendees
│  ├─ 6 sections (collapsible)
│  │  ├─ Discussion summary
│  │  ├─ Key points
│  │  ├─ Related decisions (clickable)
│  │  └─ Related tasks (clickable)
│  ├─ Decisions made (count + list)
│  ├─ Tasks created (count + list)
│  ├─ Parking lot items (count + list)
│  └─ Risks/blockers (count + list)
└─ Filter: By date range, by status (Extracted/Committed)
```

**Bolt Prompt:**
```
Build a "Meeting Flow" tab that displays meetings from the "Weekly Meeting Log" sheet.

For each meeting, show:
- Meeting metadata card (date, ID, type, attendees, Fathom link)
- Expandable sections (6 per meeting): Opening, SOW, Action Log, Decisions, Parking Lot, Risks
- Each section shows:
  - Discussion summary (2-3 sentences)
  - Key points (bullet list)
  - Related decisions (linked)
  - Related tasks (linked)
- Quick stats: X decisions, Y tasks, Z parking lot, W risks
- Visual timeline with meeting dates on left axis
- Click decision to jump to Decisions tab
- Click task to open task detail modal

Use Meeting Discussion Notes tab data for section content.
Use same visual style as existing Meeting Agendas timeline.
```

---

#### 2. Enhance Dashboard with Meeting Widget

**Why:** Dashboard should show Glen what needs attention NOW.

**What to add:**
```
Dashboard Enhancement
├─ Move task summary to top (keep existing)
├─ ADD: Recent Meetings widget (new section)
│  ├─ Last 3 meetings
│  ├─ Each shows: Date, decisions count, tasks count
│  └─ Click to jump to Meeting Flow tab
├─ ADD: Pending Review alert (if any)
│  ├─ "1 meeting needs your review"
│  └─ Click to open review document
├─ Keep: Task table (existing)
└─ Keep: Team widget (existing)
```

**Bolt Prompt:**
```
Add "Recent Meetings" widget to Dashboard between TaskSummary and MyTasksTable.

Widget should:
- Show last 3 meetings from Weekly Meeting Log
- Each meeting card displays:
  - Meeting date (large, prominent)
  - Meeting type
  - Stats: "2 decisions • 8 tasks • 3 parking lot"
  - Status badge: "Extracted" or "Committed"
- Click meeting to navigate to Meeting Flow tab
- Use gradient card style matching brand colors
- Show icon for each stat type

If no meetings: "No meetings processed yet. Run /meeting-processor after your next meeting."
```

---

#### 3. Add Task Detail Modal

**Why:** Users need to see full task details without going to Google Sheets.

**What to build:**
```
Task Detail Modal (triggered by clicking any task)
├─ Task ID and description (full text)
├─ Category, Priority, Status badges
├─ Owner, Due Date
├─ Source: "From Meeting 2026-03-05-01, Section 2"
│  └─ Link to meeting in Meeting Flow tab
├─ Linked Decision: "D-2026-03-05-02" (if any)
│  └─ Shows decision summary
│  └─ Link to Decisions tab
├─ Notes section (from Google Sheets)
└─ Action buttons:
   ├─ "Open in Google Sheets" (external link)
   └─ "Close"
```

**Bolt Prompt:**
```
Create a TaskDetailModal component that displays when user clicks any task.

Modal shows:
- Full task details from ActionLogTask type
- Source meeting (if sourceMeetingId exists) with link to Meeting Flow
- Linked decision (if linkedDecisionId exists) with summary preview
- Visual hierarchy: ID at top, description prominent, metadata below
- "Open in Google Sheets" button with link to spreadsheet row
- Smooth modal animation (slide up from bottom or fade in)
- Click outside or X to close

Use modal overlay style: dark backdrop, white card, rounded corners, shadow
```

---

### **PHASE 2: IMPORTANT (Do Soon)** 📊

#### 4. Add Decision-Task Linkage View

**Why:** Show impact of decisions - which tasks came from which decisions.

**What to add:**
```
Decisions Tab Enhancement
├─ Keep existing tab layout
├─ ADD: View toggle (List / Tree view)
├─ Tree view shows:
   ├─ Decision card
   │  ├─ Decision summary
   │  ├─ Context
   │  └─ Spawned Tasks:
   │     ├─ Task 1.1 → [status badge]
   │     ├─ Task 1.2 → [status badge]
   │     └─ Task 2.1 → [status badge]
   └─ Visual connection lines between decision and tasks
```

**Bolt Prompt:**
```
Enhance Decisions tab with toggle: List View / Impact View.

Impact View displays decisions with tree structure:
- Decision card (existing style)
- Arrow or line connecting to linked tasks
- Task cards below showing:
  - Task ID and description (truncated)
  - Status badge
  - Owner
- Use vertical lines and horizontal connectors
- Collapsible per decision
- Show "0 tasks" if no linked tasks

Style with visual hierarchy: decision prominent, tasks indented/connected.
```

---

#### 5. Implement Task/Decision Search

**Why:** Header has search bar that does nothing.

**What to build:**
```
Global Search
├─ Use existing header search input
├─ Search across:
│  ├─ Task descriptions
│  ├─ Decision summaries
│  ├─ Meeting notes
│  └─ Parking lot items
├─ Show results in dropdown:
│  ├─ Group by type (Tasks / Decisions / Meetings)
│  ├─ Highlight matching text
│  └─ Click to jump to item
└─ Empty state: "Try searching for 'Ken avatar' or 'onboarding'"
```

**Bolt Prompt:**
```
Implement global search using Header's search input.

On user types (debounced 300ms):
- Search tasks (taskDescription)
- Search decisions (decisionSummary + context)
- Search meeting notes (discussionSummary + keyPoints)
- Show dropdown below search bar with:
  - Grouped results (Tasks, Decisions, Meetings)
  - Max 5 per group
  - Highlight matching query text
  - Click result to navigate to appropriate tab and highlight item
- Use fuzzy search or simple includes()
```

---

#### 6. Improve Empty States

**Why:** Better guidance when data is missing.

**What to change:**
```
All empty states should:
├─ Have relevant icon (large, gray)
├─ Descriptive message
├─ Actionable next step
└─ Optional: Link to docs/help

Examples:
- "No meetings processed yet"
  → "After your next meeting, run /meeting-processor to extract data."
- "No tasks found"
  → "Tasks appear here from meetings or Google Sheets."
- "No decisions recorded"
  → "Decisions will appear after meetings are processed."
```

**Bolt Prompt:**
```
Update all empty states across the app to follow this pattern:

Component: EmptyState
Props: icon, title, description, actionText?, actionLink?

Style:
- Large icon (64px), gray-400 color
- Title: text-lg, font-semibold, gray-700
- Description: text-sm, gray-500
- Optional action button or link
- Centered in parent container
- Padding: p-12

Replace all current "No X found" messages with EmptyState component.
```

---

### **PHASE 3: POLISH (Do Last)** ✨

#### 7. Add Loading Skeletons

**Why:** Smoother UX than spinner-then-pop.

**Bolt Prompt:**
```
Create skeleton loaders for:
- Task table rows (8 animated rows)
- Decision cards (3 animated cards)
- Meeting timeline items (4 animated cards)
- Dashboard widgets (shimmer effect)

Use gray-200/gray-300 colors, pulse animation.
Replace spinner with skeleton in each component's loading state.
```

---

#### 8. Make Sprint Timeline Dynamic

**Why:** Currently hardcoded "Day 21 of 60" and "35%".

**Bolt Prompt:**
```
Update Sidebar sprint timeline to calculate from real dates:

const sprintStart = new Date('2026-03-01');
const sprintEnd = new Date('2026-04-30');
const today = new Date();
const totalDays = 60;
const daysPassed = Math.floor((today - sprintStart) / (1000 * 60 * 60 * 24));
const percentage = Math.round((daysPassed / totalDays) * 100);

Display: "Day {daysPassed} of {totalDays}"
Progress bar: width = {percentage}%

If sprint not started: "Sprint starts March 1"
If sprint ended: "Sprint completed"
```

---

#### 9. Improve Floating Action Button

**Why:** Currently unclear what it does.

**Options:**
- Remove it (simplest)
- Make it "Quick Add Task" with modal
- Make it "Process Meeting" shortcut

**Bolt Prompt:**
```
Option A: Remove FloatingActionButton from App.tsx

Option B: Update FloatingActionButton to open "Quick Add Task" modal:
- Click to open modal
- Form: Task description, category, priority
- "Add to Google Sheets" button
- Save to Action Log sheet
```

---

#### 10. Add Keyboard Shortcuts

**Why:** Power user efficiency.

**Bolt Prompt:**
```
Add keyboard shortcuts:
- Cmd/Ctrl + K: Focus search
- Cmd/Ctrl + D: Go to Dashboard
- Cmd/Ctrl + T: Go to All Tasks
- Cmd/Ctrl + M: Go to Meeting Flow
- Escape: Close modal/dropdown

Show shortcuts in tooltip on hover over nav items.
Add "Keyboard Shortcuts" help modal (? icon in footer).
```

---

## 🎯 WHAT TO BUILD FIRST (Bolt Work Queue)

### Immediate (Today):

1. ✅ **Meeting Flow Tab** - Centerpiece of new workflow
2. ✅ **Dashboard Recent Meetings Widget** - Show what matters
3. ✅ **Task Detail Modal** - Critical for usability

### This Week:

4. **Decision-Task Linkage View** - Show impact
5. **Global Search** - Make header search work
6. **Empty State Component** - Better guidance

### Next Week (Polish):

7. Loading skeletons
8. Dynamic sprint timeline
9. Keyboard shortcuts
10. FAB improvement/removal

---

## 📐 DESIGN PRINCIPLES

As you build, follow these principles:

### Visual Hierarchy
- **Most important:** Large, bold, high contrast
- **Secondary:** Medium size, normal weight
- **Tertiary:** Small, gray, supporting info

### Spacing
- Generous whitespace around sections (space-y-8)
- Consistent padding (p-6 for cards, p-4 for compact)
- Never crowd information

### Color Usage
- **Brand orange (#E98A24):** CTAs, highlights, active states
- **Brand blue (#1A9CD7):** Secondary actions, info
- **Status colors:**
  - Green: Done, success, positive
  - Yellow: In Progress, warning, pending
  - Red: Blocked, error, critical
  - Gray: Not Started, neutral

### Interactions
- All clickable items have hover states
- Cards lift on hover (shadow-md → shadow-lg)
- Smooth transitions (transition-all)
- Clear focus states for keyboard nav

### Typography
- **Headings:** font-bold, text-2xl or text-lg
- **Body:** text-sm or text-base, text-gray-700
- **Meta:** text-xs, text-gray-500
- **Code:** font-mono (for IDs, dates)

---

## 🚫 WHAT NOT TO CHANGE

Keep these as-is:

1. ✅ **Sidebar navigation** - Works well, don't break it
2. ✅ **All Tasks filtering** - Solid functionality
3. ✅ **Brand colors** - Orange and blue are established
4. ✅ **Table layouts** - Clean and readable
5. ✅ **Google Sheets integration** - Already working

---

## 📊 SUCCESS METRICS

How to know if improvements are working:

### User Feedback:
- Glen can navigate meeting → decision → task in under 30 seconds
- Glen finds pending review items without searching
- Glen can review meeting outcomes without opening Google Sheets

### Usage Patterns:
- Meeting Flow tab becomes most visited after Dashboard
- Task detail modal reduces direct Google Sheets visits
- Search is used regularly for finding items

### Technical:
- No console errors on production
- Load time under 2 seconds
- Smooth animations, no jank

---

## 🎨 BOLT PROMPTS SUMMARY

Copy these directly to Bolt:

### Priority 1: Meeting Flow Tab
```
Build a "Meeting Flow" tab that displays meetings from the "Weekly Meeting Log" sheet. For each meeting, show expandable card with: meeting metadata, 6 sections (Opening, SOW, Action Log, Decisions, Parking Lot, Risks), section summaries, key points, related decisions/tasks. Use timeline visual style. Connect to Google Sheets "Weekly Meeting Log" and "Meeting Discussion Notes" tabs.
```

### Priority 2: Dashboard Widget
```
Add "Recent Meetings" widget to Dashboard. Show last 3 meetings with date, type, and stats (X decisions • Y tasks). Click to navigate to Meeting Flow tab. Use gradient cards matching brand colors. Empty state: "No meetings processed yet."
```

### Priority 3: Task Modal
```
Create TaskDetailModal that shows full task details when clicking any task. Display: ID, description, category, priority, status, owner, due date, source meeting (link), linked decision (summary + link), notes. Include "Open in Google Sheets" button. Smooth modal animation.
```

---

**Total Work:** ~3-5 days with Bolt + manual refinements

**Expected Impact:** Transforms interface from basic task tracker to complete meeting-driven workflow system.
