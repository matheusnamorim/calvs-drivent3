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

async function findManyBooking(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    }
  });
}

async function findBookingById(bookingId: number) {
  return prisma.booking.findUnique({
    where: {
      id: bookingId
    }
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    }
  });
}

const bookingRepository = {
  findBooking,
  findRoomId,
  findManyBooking,
  createBooking,
  findBookingById,
  updateBooking
};

export default bookingRepository;
