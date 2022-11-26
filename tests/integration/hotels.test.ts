import app, { init } from "@/app";
import supertest from "supertest";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import faker from "@faker-js/faker";
import { createUser, createTicketType, createEnrollmentWithAddress, createTicket, createHotel, createTicketTypePaid, createRoom } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { TicketStatus } from "@prisma/client";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /hotels", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/hotels");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if enrollment is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 if the ticket does not have a hotel and is paid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and with existing hotels data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypePaid();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
     
      const hotel = await createHotel();
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: hotel.id,
            name: hotel.name,
            image: hotel.image,
            createdAt: hotel.createdAt.toISOString(),
            updatedAt: hotel.updatedAt.toISOString()
          })
        ])
      );
    });
  });
});

describe("GET /hotels/:hotelId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const hotel = await createHotel();

    const response = await server.get(`/hotels/${hotel.id}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const hotel = await createHotel();

    const response = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const hotel = await createHotel();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when id or hotel does not exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/hotels/-1").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 with hotel's and rooms data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createRoom(hotel.id);

      const response = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        createdAt: hotel.createdAt.toISOString(),
        updatedAt: hotel.updatedAt.toISOString(),
        Rooms: [
          {
            id: room.id,
            name: expect.any(String),
            capacity: room.capacity,
            hotelId: room.hotelId,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }
        ]
      });
    });
  });
});
