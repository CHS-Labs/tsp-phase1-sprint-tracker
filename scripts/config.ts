/**
 * Configuration loader for CLI scripts
 * Loads environment variables before any other imports
 */

import { config } from 'dotenv';

// Load .env file
config();

// Export for confirmation
export const envLoaded = true;
