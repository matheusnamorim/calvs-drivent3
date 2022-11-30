import { prisma } from "@/config";

async function findBooking() {
  return prisma.booking.findMany();
}

const bookingRepository = {
  findBooking,
};

export default bookingRepository;
