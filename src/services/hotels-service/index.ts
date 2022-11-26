import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel } from "@prisma/client";

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketWithStatus(userId);
  if(!ticket) {
    throw notFoundError();
  }
  
  const result = await hotelsRepository.getHotels();
  return result;
}

async function getHotelsAndRooms(hotelId: number) {
  const result = await hotelsRepository.getHotelsAndRooms(hotelId);
  if(!result) throw notFoundError();

  return result;
}

const hotelsService = {
  getHotels,
  getHotelsAndRooms
};

export default hotelsService;
