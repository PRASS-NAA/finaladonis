import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookingRepository from 'App/Repository/BookingRepository'
import BookingPostValidator from 'App/Validators/Booking/BookingPostValidator'
import BookingPatchValidator from 'App/Validators/Booking/BookingPatchValidator'
import BookingIdValidator from 'App/Validators/Booking/BookingIdValidator'

export default class BookingsController {
  public async index({ response }: HttpContextContract) {
    try {
      const bookings = await BookingRepository.showAllBookings();
      return response.status(200).json({ data: bookings, message: 'Successfully displayed all bookings!',success:true });
    } catch (err) {
      console.log("Error in AirportController - index method");
      throw err;
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(BookingIdValidator);
      const booking = await BookingRepository.showSpecificBooking(id);
      return response.status(200).json({ data: booking, message: 'Successfully displayed booking!',success:true });
    } catch (err) {
      console.log("Error in AirportController - show method");
      throw err;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(BookingPostValidator);
      const booking = await BookingRepository.createBooking(data);
      return response.status(201).json({ data: booking, message: 'Booking successfully created!',success:true });
    } catch (err) {
      console.log("Error in AirportController - store method");
      throw err;
    }
  }

  public async updatePut({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(BookingIdValidator);
      const data = await request.validate(BookingPostValidator);
      const booking = await BookingRepository.updateBookingPut(id, data);
      return response.status(200).json({ data: booking, message: 'Booking fully updated successfully!',success:true });
    } catch (err) {
      console.log("Error in AirportController - updatePut method");
      throw err;
    }
  }

  public async updatePatch({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(BookingIdValidator);
      const data = await request.validate(BookingPatchValidator);
      const booking = await BookingRepository.updateBookingPatch(id, data);
      return response.status(200).json({ data: booking, message: 'Booking partially updated successfully!',success:true });
    } catch (err) {
      console.log("Error in AirportController - updatePatch method");
      throw err;
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(BookingIdValidator);
      await BookingRepository.deleteBooking(id);
      return response.status(200).json({ message: 'Booking successfully deleted!',success:true });
    } catch (err) {
      console.log("Error in AirportController - destroy method");
      throw err;
    }
  }
}

