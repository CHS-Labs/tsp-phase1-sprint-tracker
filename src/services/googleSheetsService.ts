import {
  SOWDeliverable,
  ActionLogTask,
  WeeklyMeeting,
  Decision,
  ParkingLotIdea,
  ValidationItem,
  AnalyticsBaseline,
  Risk,
  ChangeOrder,
  TeamMember,
  SHEET_NAMES,
} from '../types';

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

class GoogleSheetsService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private async fetchSheetData(sheetName: string): Promise<any[][]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Please sign in.');
    }

    const range = `${sheetName}!A:Z`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(
      range
    )}?key=${API_KEY}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${sheetName}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.values || [];
  }

  private async updateSheetData(
    sheetName: string,
    range: string,
    values: any[][]
  ): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Please sign in.');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(
      `${sheetName}!${range}`
    )}?valueInputOption=USER_ENTERED&key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${sheetName}: ${response.statusText}`);
    }
  }

  private parseRows<T>(
    rows: any[][],
    parser: (row: any[]) => T
  ): T[] {
    if (rows.length < 2) return [];
    return rows.slice(1).map(parser).filter(Boolean);
  }

  // SOW Master Deliverables
  async getSOWDeliverables(): Promise<SOWDeliverable[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.SOW_DELIVERABLES);
    return this.parseRows(rows, (row) => ({
      category: row[0] || '',
      refinementItem: row[1] || '',
      includedInSOW: row[2] || '',
      owner: row[3] || '',
      status: row[4] || '',
      acceptanceConfirmed: row[5] || '',
      notes: row[6] || '',
    }));
  }

  // Action Log (Tasks)
  async getActionLog(): Promise<ActionLogTask[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.ACTION_LOG);
    return this.parseRows(rows, (row) => ({
      taskId: row[0] || '',
      taskDescription: row[1] || '',
      relatedSOWCategory: row[2] || '',
      owner: row[3] || '',
      source: row[4] || '',
      priority: row[5] || '',
      status: row[6] || '',
      dueDate: row[7] || '',
      sprintWeek: row[8] || '',
      notes: row[9] || '',
      linkedDecisionId: row[10] || '',
    }));
  }

  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    const rows = await this.fetchSheetData(SHEET_NAMES.ACTION_LOG);
    const rowIndex = rows.findIndex((row, idx) => idx > 0 && row[0] === taskId);

    if (rowIndex === -1) {
      throw new Error(`Task ${taskId} not found`);
    }

    await this.updateSheetData(SHEET_NAMES.ACTION_LOG, `G${rowIndex + 1}`, [[status]]);
  }

  // Weekly Meeting Log
  async getMeetingLog(): Promise<WeeklyMeeting[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.MEETING_LOG);
    return this.parseRows(rows, (row) => ({
      meetingDate: row[0] || '',
      meetingType: row[1] || '',
      zoomLink: row[2] || '',
      fathomTranscriptLink: row[3] || '',
      summary: row[4] || '',
      actionItemsExtracted: row[5] || '',
      decisionsIdentified: row[6] || '',
      processed: row[7] || '',
    }));
  }

  // Decisions Log
  async getDecisions(): Promise<Decision[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.DECISIONS);
    return this.parseRows(rows, (row) => ({
      decisionId: row[0] || '',
      date: row[1] || '',
      decisionSummary: row[2] || '',
      context: row[3] || '',
      approvedBy: row[4] || '',
      relatedSOWSection: row[5] || '',
      impact: row[6] || '',
      reversalRisk: row[7] || '',
      notes: row[8] || '',
    }));
  }

  // Parking Lot
  async getParkingLot(): Promise<ParkingLotIdea[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.PARKING_LOT);
    return this.parseRows(rows, (row) => ({
      idea: row[0] || '',
      raisedBy: row[1] || '',
      date: row[2] || '',
      relatedTo: row[3] || '',
      impactCategory: row[4] || '',
      suggestedPhase: row[5] || '',
      reviewed: row[6] || '',
    }));
  }

  // Validation Checklist
  async getValidationChecklist(): Promise<ValidationItem[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.VALIDATION);
    return this.parseRows(rows, (row) => ({
      deliverable: row[0] || '',
      delivered: row[1] || '',
      dateDelivered: row[2] || '',
      reviewedBy: row[3] || '',
      accepted: row[4] || '',
      deficiencyIdentified: row[5] || '',
      cureCompleted: row[6] || '',
    }));
  }

  // Analytics Baseline
  async getAnalytics(): Promise<AnalyticsBaseline[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.ANALYTICS);
    return this.parseRows(rows, (row) => ({
      metric: row[0] || '',
      baseline: row[1] || '',
      current: row[2] || '',
      trend: row[3] || '',
      notes: row[4] || '',
    }));
  }

  // Risk Register
  async getRiskRegister(): Promise<Risk[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.RISK_REGISTER);
    return this.parseRows(rows, (row) => ({
      risk: row[0] || '',
      probability: row[1] || '',
      impact: row[2] || '',
      owner: row[3] || '',
      mitigation: row[4] || '',
    }));
  }

  // Change Order Tracker
  async getChangeOrders(): Promise<ChangeOrder[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.CHANGE_ORDERS);
    return this.parseRows(rows, (row) => ({
      proposedChange: row[0] || '',
      date: row[1] || '',
      requiresWrittenChangeOrder: row[2] || '',
      status: row[3] || '',
    }));
  }

  // Team
  async getTeam(): Promise<TeamMember[]> {
    const rows = await this.fetchSheetData(SHEET_NAMES.TEAM);
    return this.parseRows(rows, (row) => ({
      name: row[0] || '',
      role: row[1] || '',
      email: row[2] || '',
      phone: row[3] || '',
      status: 'active',
    }));
  }
}

export const googleSheetsService = new GoogleSheetsService();
