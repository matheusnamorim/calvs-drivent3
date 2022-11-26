import { prisma } from "@/config";

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getHotelsAndRooms(hoteId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hoteId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  getHotels,
  getHotelsAndRooms
};
  
export default hotelsRepository;
