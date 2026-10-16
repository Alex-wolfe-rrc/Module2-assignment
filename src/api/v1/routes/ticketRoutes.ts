
import { Router } from "express";
import {
    getAllTicketsController,
    getTicketByIdController,
    getTicketUrgencyController,
    createTicketController,
    updateTicketController,
} from "../controllers/ticketController";

const ticketRoutes: Router = Router();

/**
 * Registers the ticket retrieval endpoints.
 */
ticketRoutes.get("/tickets", getAllTicketsController);
ticketRoutes.get("/tickets/:id", getTicketByIdController);
ticketRoutes.get("/tickets/:id/urgency", getTicketUrgencyController);
ticketRoutes.post("/tickets", createTicketController);
ticketRoutes.put("/tickets/:id", updateTicketController);

export default ticketRoutes;
