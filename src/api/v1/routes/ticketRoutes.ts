
import { Router } from "express";
import {
    getAllTicketsController,
    getTicketByIdController,
} from "../controllers/ticketController";

const ticketRoutes: Router = Router();

/**
 * Registers the ticket retrieval endpoints.
 */
ticketRoutes.get("/tickets", getAllTicketsController);
ticketRoutes.get("/tickets/:id", getTicketByIdController);

export default ticketRoutes;
