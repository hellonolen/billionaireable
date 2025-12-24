import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Run stalled user check every day at 2:00 AM UTC
crons.daily(
    "check for stalled users and send confrontation emails",
    { hourUTC: 2, minuteUTC: 0 },
    api.automation.runStalledUserCheck
);

// Run abandoned application recovery every day at 10:00 AM UTC
crons.daily(
    "send recovery emails for abandoned payment applications",
    { hourUTC: 10, minuteUTC: 0 },
    api.automation.runAbandonedApplicationRecovery
);

export default crons;
