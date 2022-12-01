import bookingRepository from "@/repositories/booking-repository";

async function listBooking(userId: number) {
  const result = await bookingRepository.findBooking(userId);
  return result;
}

const bookingService = {
  listBooking,
};

export default bookingService;
