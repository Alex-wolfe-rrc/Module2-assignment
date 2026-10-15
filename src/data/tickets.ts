
import { Ticket } from "../api/v1/ticket";

const millisecondsPerDay: number = 24 * 60 * 60 * 1000;

/**
 * Support tickets used by the API.
 *
 * Ticket creation dates are calculated relative to the current time
 * so the sample tickets retain their intended ages.
 */
export const tickets: Ticket[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: new Date(
            Date.now() - 3 * millisecondsPerDay
        ).toISOString(),
    },
    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: new Date(
            Date.now() - 2 * millisecondsPerDay
        ).toISOString(),
    },
    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: new Date(
            Date.now() - 6 * millisecondsPerDay
        ).toISOString(),
    },
    {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: new Date(
            Date.now() - 5 * millisecondsPerDay
        ).toISOString(),
    },
    {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: new Date(
            Date.now() - 9 * millisecondsPerDay
        ).toISOString(),
    },
    {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: new Date(
            Date.now() - 6 * millisecondsPerDay
        ).toISOString(),
    },
    {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: new Date(
            Date.now() - 10 * millisecondsPerDay
        ).toISOString(),
    },
];
