import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelsAndRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  try {
    const result = await hotelsService.getHotelsAndRooms(Number(hotelId));
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
