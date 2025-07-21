import PassengerQValidator from 'App/Validators/Passenger/PassengerQValidator';
import PassengerIdValidator from 'App/Validators/Passenger/PassengerIdValidator';
import PassengerPostValidator from 'App/Validators/Passenger/PassengerPostValidator';
import PassengerPatchValidator from 'App/Validators/Passenger/PassengerPatchValidator';
import PassengerRepository from 'App/Repository/PassengerRepository';
import LoginValidator from 'App/Validators/Passenger/LoginValidator';


export default class PassengersController {

  async index({ request, response }) {
    try {

      const payload = await request.validate(PassengerQValidator);

      const passengers = await PassengerRepository.showPassengers(payload);

      if(passengers.length == 0)
      {
        return response.status(404).json({message: 'Passenger not found!',success:false });
      }

      return response.status(200).json({ data: passengers, message: 'Successfully displayed passengers!',success:true });
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - index method' })
    }
  }

  async show({ request, response }) {
    try {
      const { id } = await request.validate(PassengerIdValidator);

      const passenger = await PassengerRepository.showSpecificPassenger(id);

      return response.status(200).json({ data: passenger, message: 'Successfully displayed passenger!',success:true });
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - show method' })
    }
  }

  async store({ request, response }) {
    try {
      const payload = await request.validate(PassengerPostValidator);

      const passenger = await PassengerRepository.createPassenger(payload);

      return response.status(201).json({ data: passenger, message: 'Passenger successfully created!' ,success:true});
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - store method' })
    }
  }

  async updatePut({ request, response }) {
    try {
      const { id } = await request.validate(PassengerIdValidator);
      const payload = await request.validate(PassengerPostValidator);

      const updatedPassenger = await PassengerRepository.updatePassenger(id, payload);

      return response.status(200).json({ data: updatedPassenger, message: 'Passenger fully updated!',success:true });
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - updatePut method' })
    }
  }

  async updatePatch({ request, response }) {
    try {
      const { id } = await request.validate(PassengerIdValidator);
      const payload = await request.validate(PassengerPatchValidator);

      const updatedPassenger = await PassengerRepository.patchPassenger(id, payload);

      return response.status(200).json({ data: updatedPassenger, message: 'Passenger partially updated!',success:true });
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - updatePatch method' })
    }
  }

  async destroy({ request, response }) {
    try {
      const { id } = await request.validate(PassengerIdValidator);

      const deletedPassenger = await PassengerRepository.deletePassenger(id);

      if (!deletedPassenger) {
        return response.status(404).send({ message: 'Passenger not found!',success:false });
      }

      return response.status(200).json({ message: 'Passenger successfully deleted!',success:true });
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - destroy method' })
    }
  }

  async login({request, response})
  {
    try{
      const payload = await request.validate(LoginValidator);

      const loggedIn = await PassengerRepository.loginPassenger(payload);

      return response.status(200).json({ message: 'login succesfull', token:loggedIn, success:true})
    }catch(err)
    {
      throw Object.assign(err, { location : 'PaseengersController - login method'})
    }
  }
}
