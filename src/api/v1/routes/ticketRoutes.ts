
import { Router } from "express";
import {
    getAllTicketsController,
    getTicketByIdController,
    getTicketUrgencyController,
    createTicketController,
} from "../controllers/ticketController";

const ticketRoutes: Router = Router();

/**
 * Registers the ticket retrieval endpoints.
 */
ticketRoutes.get("/tickets", getAllTicketsController);
ticketRoutes.get("/tickets/:id", getTicketByIdController);
ticketRoutes.get("/tickets/:id/urgency", getTicketUrgencyController);
ticketRoutes.post("/tickets", createTicketController);

export default ticketRoutes;
