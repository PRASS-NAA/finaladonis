import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FlightRepository from 'App/Repository/FlightRepository'
import FlightPostValidator from 'App/Validators/Flight/FlightPostValidator'
import FlightPatchValidator from 'App/Validators/Flight/FlightPatchValidator'
import FlightIdValidator from 'App/Validators/Flight/FlightIdValidator'

export default class FlightsController {
  public async index({ response }: HttpContextContract) {
    try {
      const flights = await FlightRepository.showAllFlights()
      return response.status(200).json({ data: flights, message: 'Successfully fetched flights!',success:true })
    } catch (err) {
      console.log("Error in AirportController - index method");
      throw err
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      const flight = await FlightRepository.showSpecificFlight(id)
      return response.status(200).json({ data: flight, message: 'Successfully fetched flight!',success:true })
    } catch (err) {
      console.log("Error in AirportController - show method");
      throw err
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(FlightPostValidator)
      const flight = await FlightRepository.createFlight(data)
      return response.status(201).json({ data: flight, message: 'Flight created successfully!',success:true })
    } catch (err) {
      console.log("Error in AirportController - store method");
      throw err
    }
  }

  public async updatePut({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      const data = await request.validate(FlightPostValidator)
      const flight = await FlightRepository.updateFlightPut(id, data)
      return response.status(200).json({ data: flight, message: 'Flight updated successfully!',success:true })
    } catch (err) {
      console.log("Error in AirportController - updatePut method");
      throw err
    }
  }

  public async updatePatch({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      const data = await request.validate(FlightPatchValidator)
      const flight = await FlightRepository.updateFlightPatch(id, data)
      return response.status(200).json({ data: flight, message: 'Flight patched successfully!',success:true })
    } catch (err) {
      console.log("Error in AirportController - updatePatch method");
      throw err
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      await FlightRepository.deleteFlight(id)
      return response.status(200).json({ message: 'Flight deleted successfully!',success:true })
    } catch (err) {
      console.log("Error in AirportController - destroy method");
      throw err
    }
  }

  public async departureAirport({ params, response }: HttpContextContract) {
    try{
      const flightWithDeparture = await FlightRepository.loadDepartureAirport(params.id)
      return response.json({
      message: 'Loaded departure airport successfully!',
      data: flightWithDeparture,
      departureAirport: flightWithDeparture.departureAirport,success:true
    })
    }catch(err)
    {
      console.log("Error in AirportController - departureAirport method");
      throw err;
    }
  }

  public async withBookings({ response }: HttpContextContract) {
    try{
      const flights = await FlightRepository.preloadFlightsWithBookings()
      return response.json({
      message: 'Loaded flights with bookings successfully!',
      data: flights,success:true
    })
    }catch(err)
    {
      console.log("Error in AirportController - withBookings method");
      throw err;
    }
  }
}
