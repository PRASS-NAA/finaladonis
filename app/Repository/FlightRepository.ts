import Flight from "App/Models/Flight";
import { DateTime } from "luxon";
import { Exception } from '@adonisjs/core/build/standalone';

export default class FlightRepository {

  public static async showAllFlights() {
    return Flight.all();
  }

  public static async showSpecificFlight(id) {
    return Flight.findOrFail(id);
  }

  public static async createFlight(data) {
    const departureTime = DateTime.fromISO(data.departureTime);
    const arrivalTime = DateTime.fromISO(data.arrivalTime);

    if (!departureTime.isValid || !arrivalTime.isValid) {
      throw new Exception('Invalid date format for departureTime or arrivalTime', 422)
    }

    return Flight.create({
      flightNumber: data.flightNumber,
      departureAirportId: data.departureAirportId,
      arrivalAirportId: data.arrivalAirportId,
      departureTime,
      arrivalTime,
    });
  }

  public static async updateFlightPut(id, data) {
    const flight = await Flight.findOrFail(id);

    const departureTime = DateTime.fromISO(data.departureTime);
    const arrivalTime = DateTime.fromISO(data.arrivalTime);

    if (!departureTime.isValid || !arrivalTime.isValid) {
      throw new Exception('Invalid date format for departureTime or arrivalTime', 422)
    }

    flight.flightNumber = data.flightNumber;
    flight.departureAirportId = data.departureAirportId;
    flight.arrivalAirportId = data.arrivalAirportId;
    flight.departureTime = departureTime;
    flight.arrivalTime = arrivalTime;

    await flight.save();
    return flight;
  }

  public static async updateFlightPatch(id, data) {
    const flight = await Flight.findOrFail(id);

    // Only convert and set times if they exist in payload
    if (data.departureTime) {
      const departureTime = DateTime.fromISO(data.departureTime);
      if (!departureTime.isValid) {
        throw new Exception('Invalid date format for departureTime', 422)
      }
      flight.departureTime = departureTime;
    }

    if (data.arrivalTime) {
      const arrivalTime = DateTime.fromISO(data.arrivalTime);
      if (!arrivalTime.isValid) {
        throw new Exception('Invalid date format for arrivalTime', 422)
      }
      flight.arrivalTime = arrivalTime;
    }

    flight.merge(data);

    await flight.save();
    return flight;
  }

  public static async deleteFlight(id) {
    const flight = await Flight.findOrFail(id);
    await flight.delete();
  }

  public static async loadDepartureAirport(flightId: number) {
    const flight = await Flight.findOrFail(flightId)
    await flight.load('departureAirport')
    return flight
  }

  public static async preloadFlightsWithBookings() {
    return Flight.query().preload('bookings')
  }
}
