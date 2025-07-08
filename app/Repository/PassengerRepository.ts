import Database from "@ioc:Adonis/Lucid/Database";
import Passenger from "App/Models/Passenger";

export default class PassengerRepository {

 static async showPassengers(options) {
  const query = Database.from('passengers');


  if (options.passengerName) {
    query.where('name', options.passengerName);
  }

  if (options.passengerEmail) {
    query.where('email', options.passengerEmail);
  }

  return query;
}


  static async showSpecificPassenger(id) {
    return Passenger.findOrFail(id);
  }

  static async createPassenger(payload) {
    return Passenger.create(payload);
  }

  static async updatePassenger(id, payload) {
    const passenger = await Passenger.findOrFail(id);

    passenger.name = payload.name;
    passenger.email = payload.email;

    await passenger.save();
    return passenger;
  }

  static async patchPassenger(id, payload) {
    const passenger = await Passenger.findOrFail(id);

    passenger.merge(payload);

    await passenger.save();
    return passenger;
  }

  static async deletePassenger(id) {
    const passenger = await Passenger.find(id);

    if (!passenger) {
      return null;
    }

    await passenger.delete();
    return passenger;
  }
}
