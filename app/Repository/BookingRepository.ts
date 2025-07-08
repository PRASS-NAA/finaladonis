import Booking from "App/Models/Booking";

export default class BookingRepository {
  public static async showAllBookings() {
    return Booking.all();
  }

  public static async showSpecificBooking(id) {
    return Booking.findOrFail(id);
  }

  public static async createBooking(data) {
    return Booking.create({
      passengerId: data.passengerId,
      flightId: data.flightId,
      seatNumber: data.seatNumber,
    });
  }

  public static async updateBookingPut(id, data) {
    const booking = await Booking.findOrFail(id);

    booking.passengerId = data.passengerId;
    booking.flightId = data.flightId;
    booking.seatNumber = data.seatNumber;

    await booking.save();
    return booking;
  }

  public static async updateBookingPatch(id, data) {
    const booking = await Booking.findOrFail(id);
    booking.merge(data);
    await booking.save();
    return booking;
  }

  public static async deleteBooking(id) {
    const booking = await Booking.findOrFail(id);
    await booking.delete();
  }
}
