import { Booking, Room } from "@/protocols";
import bookingRepository from "@/repositories/booking-repository";
import { exclude } from "@/utils/prisma-utils";

async function listBooking(userId: number): Promise<resultBooking> {
  const result = await bookingRepository.findBooking(userId);

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

const bookingService = {
  listBooking,
};

export default bookingService;
