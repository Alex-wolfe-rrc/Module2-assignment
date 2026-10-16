
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    getAllTickets,
    getTicketById,
    getTicketUrgencyById,
    createTicket
} from "../services/ticketService";

/**
 * Handles requests to retrieve all support tickets.
 */
export function getAllTicketsController(
    request: Request,
    response: Response
): Response {
    const allTickets = getAllTickets();

    return response.status(HTTP_STATUS.OK).json({
        message: "Tickets retrieved",
        count: allTickets.length,
        data: allTickets,
    });
}

/**
 * Handles requests to retrieve one support ticket by ID.
 */
export function getTicketByIdController(
    request: Request,
    response: Response
): Response {
    const ticketId: number = Number(request.params.id);
    const ticket = getTicketById(ticketId);

    if (ticket === undefined) {
        return response.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
    }

    return response.status(HTTP_STATUS.OK).json({
        message: "Ticket retrieved",
        data: ticket,
    });
}


/**
 * Handles requests to calculate urgency for one support ticket.
 */
export function getTicketUrgencyController(
    request: Request,
    response: Response
): Response {
    const ticketId: number = Number(request.params.id);
    const urgencyData = getTicketUrgencyById(ticketId);

    if (urgencyData === undefined) {
        return response.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
    }

    return response.status(HTTP_STATUS.OK).json({
        message: "Ticket urgency calculated",
        data: urgencyData,
    });
}


/**
 * Handles requests to create a support ticket.
 */
export function createTicketController(
    request: Request,
    response: Response
): Response {
    const title: unknown = request.body.title;
    const description: unknown = request.body.description;
    const priority: unknown = request.body.priority;

    if (
        typeof title !== "string"
        || title.trim().length === 0
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: title",
        });
    }

    if (
        typeof description !== "string"
        || description.trim().length === 0
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: description",
        });
    }

    if (
        typeof priority !== "string"
        || !["critical", "high", "medium", "low"].includes(priority)
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low",
        });
    }

    const newTicket = createTicket(
        title,
        description,
        priority as "critical" | "high" | "medium" | "low"
    );

    return response.status(HTTP_STATUS.CREATED).json({
        message: "Ticket created",
        data: newTicket,
    });
}
