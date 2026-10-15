
import { Ticket } from "../ticket";
import { tickets } from "../../../data/tickets";

/**
 * Returns every support ticket.
 */
export function getAllTickets(): Ticket[] {
    return tickets;
}

/**
 * Finds a support ticket using its ID.
 */
export function getTicketById(ticketId: number): Ticket | undefined {
    return tickets.find((ticket: Ticket) => ticket.id === ticketId);
}
