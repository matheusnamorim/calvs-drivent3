import bookingRepository from "@/repositories/booking-repository";

async function listBooking() {
  const result = await bookingRepository.findBooking();
  return result;
}

const bookingService = {
  listBooking,
};

export default bookingService;
