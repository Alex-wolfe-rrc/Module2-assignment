
import request from "supertest";

describe("Ticket API routes", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it("should return all tickets", async () => {
        const { default: app } = await import("../src/app");
        const response = await request(app).get("/api/v1/tickets");

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(7);
        expect(response.body.data).toHaveLength(7);
    });

    it("should return a ticket by ID", async () => {
        const { default: app } = await import("../src/app");

        const response = await request(app).get("/api/v1/tickets/1");

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(1);
        expect(response.body.data.title).toBe("Update footer copyright year");
    });

    it("should return urgency information for a ticket", async () => {
        const { default: app } = await import("../src/app");

        const response = await request(app).get("/api/v1/tickets/6/urgency");

        expect(response.status).toBe(200);
        expect(response.body.data.urgencyScore).toBe(80);
        expect(response.body.data.urgencyLevel).toBe(
            "Critical. Immediate attention required."
        );
    });

    it("should create a new ticket", async () => {
        const { default: app } = await import("../src/app");
        const newTicket = {
            title: "Test ticket",
            description: "Ticket created by an automated test",
            priority: "medium",
        };

        const response = await request(app)
            .post("/api/v1/tickets")
            .send(newTicket);

        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe(newTicket.title);
        expect(response.body.data.status).toBe("open");
    });

    it("should update an existing ticket", async () => {
        const { default: app } = await import("../src/app");
        const updates = { status: "resolved" };

        const response = await request(app)
            .put("/api/v1/tickets/1")
            .send(updates);

        expect(response.status).toBe(200);
        expect(response.body.data.status).toBe("resolved");
    });

    it("should delete an existing ticket", async () => {
        const { default: app } = await import("../src/app");

        const response = await request(app).delete("/api/v1/tickets/1");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Ticket deleted");
    });
});
