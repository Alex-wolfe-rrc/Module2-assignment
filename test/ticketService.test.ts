
import { getTicketUrgencyById } from "../src/api/v1/services/ticketService";

describe("getTicketUrgencyById", () => {
    it("should calculate urgency for a low-priority ticket", () => {
        const result = getTicketUrgencyById(1);

        expect(result).toBeDefined();
        expect(result?.ticketAge).toBe(3);
        expect(result?.urgencyScore).toBe(25);
        expect(result?.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
    });

    it("should calculate urgency for a critical-priority ticket", () => {
        const result = getTicketUrgencyById(6);

        expect(result).toBeDefined();
        expect(result?.ticketAge).toBe(6);
        expect(result?.urgencyScore).toBe(80);
        expect(result?.urgencyLevel).toBe("Critical. Immediate attention required.");
    });

    it("should give resolved tickets an urgency score of zero", () => {
        const result = getTicketUrgencyById(7);

        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBe(0);
    });

    it("should return undefined for a ticket that does not exist", () => {
        const result = getTicketUrgencyById(999);

        expect(result).toBeUndefined();
    });
});
