
/**
 * The allowed priority levels for a support ticket.
 */
export type TicketPriority = "critical" | "high" | "medium" | "low";

/**
 * The allowed statuses for a support ticket.
 */
export type TicketStatus = "open" | "in-progress" | "resolved";

/**
 * Describes the information stored for each support ticket.
 */
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    createdAt: string;
}
