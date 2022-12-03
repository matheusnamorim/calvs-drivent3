import { getBooking, postBooking } from "@/controllers";
import { authenticateToken, validateBodyBooking } from "@/middlewares";
import { bookingSchemas } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBodyBooking(bookingSchemas), postBooking);

export { bookingRouter };
