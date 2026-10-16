
import { Ticket, TicketUrgencyResult } from "../ticket";
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


/**
 * Calculates the urgency information for a support ticket.
 */
export function getTicketUrgencyById(
    ticketId: number
): TicketUrgencyResult | undefined {
    const ticket: Ticket | undefined = getTicketById(ticketId);

    if (ticket === undefined) {
        return undefined;
    }

    const millisecondsPerDay: number = 24 * 60 * 60 * 1000;
    const ticketAge: number = Math.floor(
        (Date.now() - new Date(ticket.createdAt).getTime())
        / millisecondsPerDay
    );

    const baseUrgencyScores: Record<Ticket["priority"], number> = {
        critical: 50,
        high: 30,
        medium: 20,
        low: 10,
    };

    let urgencyScore: number = 0;
    let urgencyLevel: string = "Minimal urgency";

    if (ticket.status !== "resolved") {
        urgencyScore = baseUrgencyScores[ticket.priority]
            + ticketAge * 5;

        if (urgencyScore < 30) {
            urgencyLevel = "Low urgency. Address when capacity allows.";
        } else if (urgencyScore < 55) {
            urgencyLevel = "Moderate. Schedule for attention.";
        } else if (urgencyScore < 80) {
            urgencyLevel = "High urgency. Prioritize resolution.";
        } else {
            urgencyLevel = "Critical. Immediate attention required.";
        }
    }

    return {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketAge: ticketAge,
        urgencyScore: urgencyScore,
        urgencyLevel: urgencyLevel,
    };
}

/**
 * Adds a new support ticket to the in-memory ticket list.
 */
export function createTicket(
    title: string,
    description: string,
    priority: Ticket["priority"]
): Ticket {
    const nextId: number = tickets.reduce(
        (highestId: number, ticket: Ticket) =>
            Math.max(highestId, ticket.id),
        0
    ) + 1;

    const newTicket: Ticket = {
        id: nextId,
        title: title,
        description: description,
        priority: priority,
        status: "open",
        createdAt: new Date().toISOString(),
    };

    tickets.push(newTicket);

    return newTicket;
}


/**
 * Updates an existing support ticket.
 */
export function updateTicket(
    ticketId: number,
    updates: Partial<Omit<Ticket, "id" | "createdAt">>
): Ticket | undefined {
    const ticket: Ticket | undefined = getTicketById(ticketId);

    if (ticket === undefined) {
        return undefined;
    }

    if (updates.title !== undefined) {
        ticket.title = updates.title;
    }

    if (updates.description !== undefined) {
        ticket.description = updates.description;
    }

    if (updates.priority !== undefined) {
        ticket.priority = updates.priority;
    }

    if (updates.status !== undefined) {
        ticket.status = updates.status;
    }

    return ticket;
}
