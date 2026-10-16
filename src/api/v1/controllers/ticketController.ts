
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    getAllTickets,
    getTicketById,
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
