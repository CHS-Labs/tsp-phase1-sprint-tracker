import { ActionLogTask } from '../types';
import { googleSheetsService } from './googleSheetsService';

// ═══════════════════════════════════════════════════════════════════════════
// MEETING PROCESSOR SERVICE
// ═══════════════════════════════════════════════════════════════════════════
// Processes Fathom meeting transcripts into structured data for Control Center
// Follows 6-section meeting structure defined in Glen's meeting format

interface MeetingMetadata {
  meetingDate: string; // YYYY-MM-DD
  meetingId: string; // YYYY-MM-DD-##
  meetingType: string;
  attendees: string[];
  fathomLink: string;
  transcriptWordCount: number;
  processingDate: string;
}

interface SectionExtraction {
  sectionNumber: number;
  sectionTitle: string;
  discussionSummary: string;
  keyPoints: string[];
  relatedDecisions: string[];
  relatedTasks: string[];
}

interface ExtractedDecision {
  decisionId: string;
  decisionSummary: string;
  context: string;
  approvedBy: string;
  impact: 'High' | 'Medium' | 'Low';
  reversalRisk: 'High' | 'Medium' | 'Low';
  sourceSection: number;
  relatedTasks: string[];
}

interface ExtractedTask {
  taskId: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  owner: string;
  sourceSection: number;
  linkedDecisionId?: string;
  status: 'Not Started';
}

interface DuplicateCheck {
  taskId: string;
  similarTo: string | null;
  similarity: number;
  isDuplicate: boolean;
}

interface ParkingLotItem {
  idea: string;
  suggestedPhase: string;
  raisedBy: string;
}

interface RiskBlocker {
  risk: string;
  probability: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

interface MeetingExtractionResult {
  metadata: MeetingMetadata;
  sections: SectionExtraction[];
  decisions: ExtractedDecision[];
  tasks: ExtractedTask[];
  duplicateChecks: DuplicateCheck[];
  parkingLot: ParkingLotItem[];
  risks: RiskBlocker[];
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION TITLES
// ═══════════════════════════════════════════════════════════════════════════
const SECTION_TITLES = [
  'Opening + Intent',
  'Review SOW Deliverables',
  'Review Action Log',
  'Decision Confirmations',
  'Parking Lot',
  'Risks / Blockers',
];

class MeetingProcessorService {
  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Main entry point: Process a Fathom transcript into structured data
   */
  async processTranscript(
    transcript: string,
    meetingDate: string,
    fathomLink: string = '',
    meetingType: string = 'Weekly Sprint Review'
  ): Promise<MeetingExtractionResult> {
    console.log('═'.repeat(80));
    console.log('[MeetingProcessor] Starting transcript processing');
    console.log('Meeting Date:', meetingDate);
    console.log('Transcript Length:', transcript.length, 'characters');
    console.log('═'.repeat(80));

    // Step 1: Generate meeting ID
    const meetingId = await this.generateMeetingId(meetingDate);

    // Step 2: Extract metadata
    const metadata: MeetingMetadata = {
      meetingDate,
      meetingId,
      meetingType,
      attendees: this.extractAttendees(transcript),
      fathomLink,
      transcriptWordCount: transcript.split(/\s+/).length,
      processingDate: new Date().toISOString().split('T')[0],
    };

    // Step 3: Segment transcript into 6 sections
    const segments = this.segmentTranscript(transcript);

    // Step 4: Extract data from each section
    const sections: SectionExtraction[] = [];
    const allDecisions: ExtractedDecision[] = [];
    const allTasks: ExtractedTask[] = [];
    const parkingLot: ParkingLotItem[] = [];
    const risks: RiskBlocker[] = [];

    for (let i = 0; i < segments.length; i++) {
      const sectionData = await this.extractSectionData(
        segments[i],
        i + 1,
        meetingId
      );

      sections.push(sectionData.section);
      allDecisions.push(...sectionData.decisions);
      allTasks.push(...sectionData.tasks);
      parkingLot.push(...sectionData.parkingLot);
      risks.push(...sectionData.risks);
    }

    // Step 5: Check for duplicate tasks
    const duplicateChecks = await this.checkDuplicates(allTasks);

    console.log('═'.repeat(80));
    console.log('[MeetingProcessor] Extraction complete');
    console.log('Decisions:', allDecisions.length);
    console.log('Tasks:', allTasks.length);
    console.log('Parking Lot Items:', parkingLot.length);
    console.log('Risks/Blockers:', risks.length);
    console.log('═'.repeat(80));

    return {
      metadata,
      sections,
      decisions: allDecisions,
      tasks: allTasks,
      duplicateChecks,
      parkingLot,
      risks,
    };
  }

  /**
   * Generate review document content (Google Doc format)
   */
  generateReviewDocument(result: MeetingExtractionResult): string {
    const { metadata, sections, decisions, tasks, duplicateChecks, parkingLot, risks } = result;

    let doc = `PENDING REVIEW: ${metadata.meetingDate} Meeting Extraction\n\n`;
    doc += `${'═'.repeat(70)}\n`;
    doc += `MEETING METADATA\n`;
    doc += `${'═'.repeat(70)}\n`;
    doc += `Date: ${metadata.meetingDate}\n`;
    doc += `Meeting ID: ${metadata.meetingId}\n`;
    doc += `Meeting Type: ${metadata.meetingType}\n`;
    doc += `Attendees: ${metadata.attendees.join(', ')}\n`;
    doc += `Fathom Link: ${metadata.fathomLink || 'Not provided'}\n`;
    doc += `Transcript Word Count: ${metadata.transcriptWordCount} words\n`;
    doc += `Processing Date: ${metadata.processingDate}\n\n`;

    // Sections
    sections.forEach((section) => {
      doc += `${'═'.repeat(70)}\n`;
      doc += `SECTION ${section.sectionNumber}: ${section.sectionTitle.toUpperCase()}\n`;
      doc += `${'═'.repeat(70)}\n\n`;
      doc += `Discussion Summary:\n${section.discussionSummary}\n\n`;
      doc += `Key Points:\n`;
      section.keyPoints.forEach((point) => {
        doc += `• ${point}\n`;
      });
      doc += `\n`;
      doc += `Related Decisions: ${section.relatedDecisions.join(', ') || 'None'}\n`;
      doc += `Related Tasks: ${section.relatedTasks.join(', ') || 'None'}\n\n`;
    });

    // Decisions
    doc += `${'═'.repeat(70)}\n`;
    doc += `EXTRACTED DECISIONS\n`;
    doc += `${'═'.repeat(70)}\n\n`;
    if (decisions.length === 0) {
      doc += `No explicit decisions identified in transcript.\n\n`;
    } else {
      decisions.forEach((decision) => {
        doc += `Decision ${decision.decisionId}:\n`;
        doc += `├─ Decision: ${decision.decisionSummary}\n`;
        doc += `├─ Context: ${decision.context}\n`;
        doc += `├─ Approved By: ${decision.approvedBy}\n`;
        doc += `├─ Impact: ${decision.impact}\n`;
        doc += `├─ Reversal Risk: ${decision.reversalRisk}\n`;
        doc += `├─ Source Section: ${decision.sourceSection}\n`;
        doc += `└─ Related Tasks: ${decision.relatedTasks.join(', ') || 'None'}\n\n`;
      });
    }

    // Tasks
    doc += `${'═'.repeat(70)}\n`;
    doc += `EXTRACTED TASKS (NEW)\n`;
    doc += `${'═'.repeat(70)}\n\n`;
    if (tasks.length === 0) {
      doc += `No new tasks identified in transcript.\n\n`;
    } else {
      tasks.forEach((task) => {
        const dupCheck = duplicateChecks.find((dc) => dc.taskId === task.taskId);
        doc += `Task ${task.taskId}:\n`;
        doc += `├─ Description: ${task.description}\n`;
        doc += `├─ Category: ${task.category}\n`;
        doc += `├─ Priority: ${task.priority}\n`;
        doc += `├─ Owner: ${task.owner}\n`;
        doc += `├─ Source: Meeting ${metadata.meetingId}, Section ${task.sourceSection}\n`;
        doc += `├─ Linked Decision: ${task.linkedDecisionId || 'None'}\n`;
        doc += `└─ Status: ${task.status}\n\n`;

        if (dupCheck) {
          if (dupCheck.isDuplicate && dupCheck.similarTo) {
            doc += `⚠️ DUPLICATE CHECK:\n`;
            doc += `   Similar to existing Task ${dupCheck.similarTo}\n`;
            doc += `   Confidence: ${Math.round(dupCheck.similarity * 100)}%\n`;
            doc += `   → REVIEW REQUIRED: Keep separate or merge?\n\n`;
          } else {
            doc += `✓ No similar task found\n\n`;
          }
        }
      });
    }

    // Parking Lot
    doc += `${'═'.repeat(70)}\n`;
    doc += `PARKING LOT ITEMS IDENTIFIED\n`;
    doc += `${'═'.repeat(70)}\n\n`;
    if (parkingLot.length === 0) {
      doc += `None identified in this meeting.\n\n`;
    } else {
      parkingLot.forEach((item) => {
        doc += `• ${item.idea} - ${item.suggestedPhase}\n`;
      });
      doc += `\n`;
    }

    // Risks/Blockers
    doc += `${'═'.repeat(70)}\n`;
    doc += `RISKS/BLOCKERS IDENTIFIED\n`;
    doc += `${'═'.repeat(70)}\n\n`;
    if (risks.length === 0) {
      doc += `None identified in this meeting.\n\n`;
    } else {
      risks.forEach((risk) => {
        doc += `• ${risk.risk} - Probability: ${risk.probability}`;
        if (risk.mitigation) {
          doc += `, Mitigation: ${risk.mitigation}`;
        }
        doc += `\n`;
      });
      doc += `\n`;
    }

    // Glen's Review Actions
    doc += `${'═'.repeat(70)}\n`;
    doc += `GLEN'S REVIEW ACTIONS\n`;
    doc += `${'═'.repeat(70)}\n\n`;
    doc += `Please review and complete:\n\n`;
    doc += `☐ Review all extracted decisions - accurate? (Y/N)\n`;
    doc += `   Comments: ___________________\n\n`;
    doc += `☐ Review all extracted tasks - correct? (Y/N)\n`;
    doc += `   Comments: ___________________\n\n`;
    doc += `☐ Resolve duplicate flags:\n`;
    duplicateChecks
      .filter((dc) => dc.isDuplicate)
      .forEach((dc) => {
        doc += `   Task ${dc.taskId}: ☐ Keep separate ☐ Merge with ${dc.similarTo} ☐ Delete\n`;
      });
    doc += `\n`;
    doc += `☐ Assign owners to [TBD] tasks:\n`;
    tasks
      .filter((t) => t.owner === '[TBD]')
      .forEach((t) => {
        doc += `   Task ${t.taskId}: Owner = _______________\n`;
      });
    doc += `\n`;
    doc += `☐ Any corrections needed?\n`;
    doc += `   ____________________________________\n\n`;

    // Approval
    doc += `${'═'.repeat(70)}\n`;
    doc += `APPROVAL\n`;
    doc += `${'═'.repeat(70)}\n\n`;
    doc += `☐ APPROVED - Commit to Control Center\n\n`;
    doc += `Approved By: _______________ Date: ___________\n\n`;
    doc += `${'═'.repeat(70)}\n`;

    return doc;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Generate unique meeting ID in format YYYY-MM-DD-##
   */
  private async generateMeetingId(meetingDate: string): Promise<string> {
    // TODO: Check existing meetings to increment counter
    // For now, use -01
    return `${meetingDate}-01`;
  }

  /**
   * Extract attendee names from transcript
   */
  private extractAttendees(transcript: string): string[] {
    // Look for common patterns: "Present:", "Attendees:", names in first 500 chars
    const attendees = new Set<string>();

    // Common names in TSP project
    const commonNames = ['Glen', 'Ed', 'Shelly', 'Ken'];
    commonNames.forEach((name) => {
      if (transcript.includes(name)) {
        attendees.add(name);
      }
    });

    return attendees.size > 0 ? Array.from(attendees) : ['Not detected'];
  }

  /**
   * Segment transcript into 6 sections
   */
  private segmentTranscript(transcript: string): string[] {
    const sections: string[] = [];

    // Try to find explicit section markers
    const sectionMarkers = [
      /section\s+1[:\s]/i,
      /section\s+2[:\s]/i,
      /section\s+3[:\s]/i,
      /section\s+4[:\s]/i,
      /section\s+5[:\s]/i,
      /section\s+6[:\s]/i,
    ];

    const markerPositions: number[] = [];
    sectionMarkers.forEach((marker) => {
      const match = transcript.match(marker);
      if (match && match.index !== undefined) {
        markerPositions.push(match.index);
      }
    });

    if (markerPositions.length >= 3) {
      // Found explicit markers - use them
      for (let i = 0; i < markerPositions.length; i++) {
        const start = markerPositions[i];
        const end = i < markerPositions.length - 1 ? markerPositions[i + 1] : transcript.length;
        sections.push(transcript.substring(start, end));
      }
      // Fill remaining sections with empty strings
      while (sections.length < 6) {
        sections.push('');
      }
    } else {
      // No clear markers - divide into 6 equal segments
      const segmentLength = Math.floor(transcript.length / 6);
      for (let i = 0; i < 6; i++) {
        const start = i * segmentLength;
        const end = i === 5 ? transcript.length : (i + 1) * segmentLength;
        sections.push(transcript.substring(start, end));
      }
    }

    return sections;
  }

  /**
   * Extract structured data from a single section
   */
  private async extractSectionData(
    sectionText: string,
    sectionNumber: number,
    meetingId: string
  ): Promise<{
    section: SectionExtraction;
    decisions: ExtractedDecision[];
    tasks: ExtractedTask[];
    parkingLot: ParkingLotItem[];
    risks: RiskBlocker[];
  }> {
    // This is a simplified extraction - in production, would use AI/NLP
    const section: SectionExtraction = {
      sectionNumber,
      sectionTitle: SECTION_TITLES[sectionNumber - 1],
      discussionSummary: this.extractSummary(sectionText),
      keyPoints: this.extractKeyPoints(sectionText),
      relatedDecisions: [],
      relatedTasks: [],
    };

    const decisions = this.extractDecisions(sectionText, sectionNumber, meetingId);
    const tasks = this.extractTasks(sectionText, sectionNumber, meetingId);
    const parkingLot = sectionNumber === 5 ? this.extractParkingLot(sectionText) : [];
    const risks = sectionNumber === 6 ? this.extractRisks(sectionText) : [];

    // Link section to decisions/tasks
    section.relatedDecisions = decisions.map((d) => d.decisionId);
    section.relatedTasks = tasks.map((t) => t.taskId);

    return { section, decisions, tasks, parkingLot, risks };
  }

  /**
   * Extract summary from section text (simplified)
   */
  private extractSummary(text: string): string {
    // Take first 200 characters as summary
    const trimmed = text.trim().substring(0, 200);
    return trimmed + (text.length > 200 ? '...' : '');
  }

  /**
   * Extract key points (simplified - looks for bullet points or numbered lists)
   */
  private extractKeyPoints(text: string): string[] {
    const points: string[] = [];

    // Look for bullet points or numbers
    const lines = text.split('\n');
    lines.forEach((line) => {
      if (/^[•\-\*]\s/.test(line.trim()) || /^\d+[\.)]\s/.test(line.trim())) {
        points.push(line.trim().replace(/^[•\-\*\d+\.)]\s*/, ''));
      }
    });

    // If no bullets found, extract first 3 sentences
    if (points.length === 0) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      return sentences.slice(0, 3).map((s) => s.trim());
    }

    return points.slice(0, 5);
  }

  /**
   * Extract decisions from section text
   */
  private extractDecisions(
    text: string,
    sectionNumber: number,
    meetingId: string
  ): ExtractedDecision[] {
    const decisions: ExtractedDecision[] = [];

    // Look for decision keywords
    const decisionPatterns = [
      /decided\s+(?:to\s+)?([^.!?]+)/gi,
      /agreed\s+(?:to\s+)?([^.!?]+)/gi,
      /approved\s+([^.!?]+)/gi,
      /confirmed\s+([^.!?]+)/gi,
    ];

    let decisionCount = 0;
    decisionPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        decisionCount++;
        decisions.push({
          decisionId: `D-${meetingId}-${String(decisionCount).padStart(2, '0')}`,
          decisionSummary: match[1].trim(),
          context: 'Extracted from meeting discussion',
          approvedBy: 'Team',
          impact: 'Medium',
          reversalRisk: 'Low',
          sourceSection: sectionNumber,
          relatedTasks: [],
        });
      }
    });

    return decisions;
  }

  /**
   * Extract tasks from section text
   */
  private extractTasks(
    text: string,
    sectionNumber: number,
    meetingId: string
  ): ExtractedTask[] {
    const tasks: ExtractedTask[] = [];

    // Look for task keywords
    const taskPatterns = [
      /need\s+to\s+([^.!?]+)/gi,
      /should\s+([^.!?]+)/gi,
      /action\s+item[:\s]+([^.!?]+)/gi,
      /task[:\s]+([^.!?]+)/gi,
    ];

    let taskCount = 0;
    taskPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        taskCount++;
        tasks.push({
          taskId: `${sectionNumber}.${taskCount}`,
          description: match[1].trim(),
          category: this.inferCategory(sectionNumber),
          priority: this.inferPriority(match[1]),
          owner: '[TBD]',
          sourceSection: sectionNumber,
          status: 'Not Started',
        });
      }
    });

    return tasks;
  }

  /**
   * Infer task category from section number
   */
  private inferCategory(sectionNumber: number): string {
    const categoryMap: Record<number, string> = {
      1: 'Opening + Intent',
      2: 'SOW Deliverables',
      3: 'Action Log',
      4: 'Decisions',
      5: 'Parking Lot',
      6: 'Risks / Blockers',
    };
    return categoryMap[sectionNumber] || 'General';
  }

  /**
   * Infer priority from text content
   */
  private inferPriority(text: string): 'High' | 'Medium' | 'Low' {
    const highKeywords = ['critical', 'urgent', 'must', 'immediately', 'asap'];
    const lowKeywords = ['nice to have', 'consider', 'maybe', 'eventually'];

    const lowerText = text.toLowerCase();

    if (highKeywords.some((kw) => lowerText.includes(kw))) {
      return 'High';
    }
    if (lowKeywords.some((kw) => lowerText.includes(kw))) {
      return 'Low';
    }
    return 'Medium';
  }

  /**
   * Extract parking lot items
   */
  private extractParkingLot(text: string): ParkingLotItem[] {
    const items: ParkingLotItem[] = [];

    // Look for Phase 2 or future mentions
    const phase2Pattern = /(?:phase\s+2|future|later)[:\s]*([^.!?]+)/gi;
    let match;
    while ((match = phase2Pattern.exec(text)) !== null) {
      items.push({
        idea: match[1].trim(),
        suggestedPhase: 'Phase 2',
        raisedBy: 'Team',
      });
    }

    return items;
  }

  /**
   * Extract risks/blockers
   */
  private extractRisks(text: string): RiskBlocker[] {
    const risks: RiskBlocker[] = [];

    // Look for risk keywords
    const riskPattern = /(?:risk|concern|blocker|issue)[:\s]*([^.!?]+)/gi;
    let match;
    while ((match = riskPattern.exec(text)) !== null) {
      risks.push({
        risk: match[1].trim(),
        probability: 'Medium',
        mitigation: 'To be determined',
      });
    }

    return risks;
  }

  /**
   * Check for duplicate tasks against existing Action Log
   */
  private async checkDuplicates(tasks: ExtractedTask[]): Promise<DuplicateCheck[]> {
    const checks: DuplicateCheck[] = [];

    // Fetch existing tasks from Action Log
    const existingTasks = await googleSheetsService.getActionLog();

    for (const task of tasks) {
      let maxSimilarity = 0;
      let mostSimilarTask: string | null = null;

      // Simple word-based similarity check
      for (const existing of existingTasks) {
        const similarity = this.calculateSimilarity(
          task.description,
          existing.taskDescription
        );

        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          mostSimilarTask = existing.taskId;
        }
      }

      checks.push({
        taskId: task.taskId,
        similarTo: maxSimilarity > 0.8 ? mostSimilarTask : null,
        similarity: maxSimilarity,
        isDuplicate: maxSimilarity > 0.8,
      });
    }

    return checks;
  }

  /**
   * Calculate similarity between two strings (0-1)
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));

    const intersection = new Set([...words1].filter((w) => words2.has(w)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }
}

export const meetingProcessorService = new MeetingProcessorService();
