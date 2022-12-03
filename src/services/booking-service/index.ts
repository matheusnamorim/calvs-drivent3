import { forbiddenError, notFoundError } from "@/errors";
import { Booking, Room } from "@/protocols";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
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

type resultBooking = Omit<Booking, "userId" | "createdAt" | "updatedAt" | "roomId"> & {
  Room: Omit<Room, "createdAt" | "updatedAt">
};

async function addBooking(userId: number, roomId: number) {
  const resultEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!resultEnrollment) throw forbiddenError();

  const result = await bookingRepository.findRoomId(roomId);
  if(!result) throw notFoundError();

  const bookings = await bookingRepository.findManyBooking(roomId);
  if(result.capacity === bookings.length) throw forbiddenError();

  return;
}

const bookingService = {
  listBooking,
  addBooking,
};

export default bookingService;
