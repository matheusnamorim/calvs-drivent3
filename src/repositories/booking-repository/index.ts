import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true
    },
  });
}

async function findRoomId(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    },
  });
}

const bookingRepository = {
  findBooking,
  findRoomId
};

export default bookingRepository;
