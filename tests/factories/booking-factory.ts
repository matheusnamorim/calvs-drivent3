import { prisma } from "@/config";

export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export async function createManyBooking(userId: number, roomId: number) {
  return prisma.booking.createMany({
    data: [
      { userId, roomId, },
      { userId, roomId, },
      { userId, roomId, },
    ]
  });
}
