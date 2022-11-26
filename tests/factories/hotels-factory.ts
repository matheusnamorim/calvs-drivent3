import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";
import faker from "@faker-js/faker";

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoom(id: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: id
    }
  });
}
