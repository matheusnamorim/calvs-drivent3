import { getBooking, postBooking } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { bookingSchemas } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(bookingSchemas), postBooking);

export { bookingRouter };
