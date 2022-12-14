import bookingService from "@/services/booking-service";
import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { forbiddenError } from "@/errors";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await bookingService.listBooking(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const result = await bookingService.addBooking(userId, roomId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "Forbidden") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { bookingId } = req.params;
  const { roomId } = req.body;

  try {
    if(!bookingId || isNaN(Number(bookingId)) || Number(bookingId) < 0) throw forbiddenError();

    const result = await bookingService.updateBooking(userId, Number(bookingId), roomId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "Forbidden") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
