/**
 * Test script for meeting processor
 *
 * Usage:
 *   npx tsx scripts/test-meeting-processor.ts <transcript-file>
 *
 * Or with inline transcript:
 *   npx tsx scripts/test-meeting-processor.ts --inline "Your transcript text here"
 */

// IMPORTANT: Load environment variables FIRST, before any other imports
import './config';

import * as fs from 'fs';
import * as path from 'path';
import { meetingProcessorService } from '../src/services/meetingProcessorService';

async function main() {
  const args = process.argv.slice(2);

  let transcript = '';
  let meetingDate = new Date().toISOString().split('T')[0];
  let fathomLink = '';

  // Parse arguments
  if (args.length === 0) {
    console.error('Usage: npx tsx scripts/test-meeting-processor.ts <transcript-file>');
    console.error('   or: npx tsx scripts/test-meeting-processor.ts --inline "transcript text"');
    process.exit(1);
  }

  if (args[0] === '--inline') {
    transcript = args[1] || '';
  } else if (args[0] === '--date') {
    meetingDate = args[1];
    if (args[2] === '--inline') {
      transcript = args[3] || '';
    } else {
      const transcriptPath = path.resolve(args[2]);
      transcript = fs.readFileSync(transcriptPath, 'utf-8');
    }
  } else {
    // File path
    const transcriptPath = path.resolve(args[0]);
    transcript = fs.readFileSync(transcriptPath, 'utf-8');
  }

  if (!transcript) {
    console.error('Error: No transcript provided');
    process.exit(1);
  }

  console.log('\n');
  console.log('═'.repeat(80));
  console.log('MEETING PROCESSOR TEST');
  console.log('═'.repeat(80));
  console.log(`Meeting Date: ${meetingDate}`);
  console.log(`Transcript Length: ${transcript.length} characters`);
  console.log('═'.repeat(80));
  console.log('\n');

  try {
    // Process the transcript
    const result = await meetingProcessorService.processTranscript(
      transcript,
      meetingDate,
      fathomLink
    );

    // Generate review document
    const reviewDoc = meetingProcessorService.generateReviewDocument(result);

    // Save to file
    const outputDir = path.join(process.cwd(), 'output', 'meeting-reviews');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(
      outputDir,
      `PENDING_REVIEW_${result.metadata.meetingId}.txt`
    );
    fs.writeFileSync(outputPath, reviewDoc);

    // Print summary
    console.log('\n');
    console.log('═'.repeat(80));
    console.log('✓ EXTRACTION COMPLETE');
    console.log('═'.repeat(80));
    console.log(`Meeting ID: ${result.metadata.meetingId}`);
    console.log(`Date: ${result.metadata.meetingDate}`);
    console.log(`Attendees: ${result.metadata.attendees.join(', ')}`);
    console.log(`Transcript: ${result.metadata.transcriptWordCount} words`);
    console.log('\n');
    console.log('Extracted:');
    console.log(`✓ ${result.decisions.length} decisions identified`);
    console.log(`✓ ${result.tasks.length} tasks identified`);
    console.log(`✓ ${result.duplicateChecks.filter(dc => dc.isDuplicate).length} potential duplicates flagged`);
    console.log(`✓ ${result.parkingLot.length} parking lot items`);
    console.log(`✓ ${result.risks.length} risks/blockers`);
    console.log('\n');
    console.log('Review document saved to:');
    console.log(`📄 ${outputPath}`);
    console.log('\n');
    console.log('═'.repeat(80));
    console.log('\n');

    // Print duplicate warnings
    const duplicates = result.duplicateChecks.filter(dc => dc.isDuplicate);
    if (duplicates.length > 0) {
      console.log('⚠️  DUPLICATE WARNINGS:');
      duplicates.forEach(dup => {
        console.log(`   Task ${dup.taskId} is ${Math.round(dup.similarity * 100)}% similar to ${dup.similarTo}`);
      });
      console.log('\n');
    }

    console.log('Next Steps:');
    console.log('1. Review the document above');
    console.log('2. Resolve duplicate flags');
    console.log('3. Assign task owners');
    console.log('4. Check APPROVED box');
    console.log('5. Run: /commit-meeting-changes <doc-link>');
    console.log('\n');

  } catch (error) {
    console.error('Error processing transcript:', error);
    process.exit(1);
  }
}

main();
