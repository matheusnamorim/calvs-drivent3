import { notFoundError } from "@/errors";
import { Booking, Room } from "@/protocols";
import bookingRepository from "@/repositories/booking-repository";
import { exclude } from "@/utils/prisma-utils";

async function listBooking(userId: number): Promise<resultBooking> {
  const result = await bookingRepository.findBooking(userId);
  if(!result) throw notFoundError();

  return {
    ...exclude(result, "userId", "createdAt", "updatedAt", "roomId"),
    Room: {
      ...exclude(result.Room, "createdAt", "updatedAt")
    }
  };
}

async function addBooking(userId: number, roomId: number) {
  await validateRoomId(userId, roomId);
  return;
}

type resultBooking = Omit<Booking, "userId" | "createdAt" | "updatedAt" | "roomId"> & {
  Room: Omit<Room, "createdAt" | "updatedAt">
};

async function validateRoomId(userId: number, roomId: number) {
  const result = await bookingRepository.findRoomId(roomId);
  if(!result) throw notFoundError();
}

const bookingService = {
  listBooking,
  addBooking,
};

export default bookingService;
