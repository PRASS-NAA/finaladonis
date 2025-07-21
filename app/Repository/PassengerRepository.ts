import Database from "@ioc:Adonis/Lucid/Database";
import Passenger from "App/Models/Passenger";
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import { Exception } from "@adonisjs/core/build/standalone";

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

  static async loginPassenger(passenger)
  {
    console.log(passenger);

    const user = await Passenger.findByOrFail('email', passenger.email);

    if(!(user.password == passenger.password))
    {
      throw new Exception("Unauthorized -- wrong password ");
    }

    const payload = {
      email: user.email
    }


    const token = jwt.sign(payload, Env.get('JWT_SECRET'), {
      expiresIn: '1h',
    })

    return token;
  }
}
