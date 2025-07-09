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
      throw Object.assign(err, { location: 'AirportController - index method' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      const flight = await FlightRepository.showSpecificFlight(id)
      return response.status(200).json({ data: flight, message: 'Successfully fetched flight!',success:true })
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - show method' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(FlightPostValidator)
      const flight = await FlightRepository.createFlight(data)
      return response.status(201).json({ data: flight, message: 'Flight created successfully!',success:true })
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - store method' })
    }
  }

  public async updatePut({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      const data = await request.validate(FlightPostValidator)
      const flight = await FlightRepository.updateFlightPut(id, data)
      return response.status(200).json({ data: flight, message: 'Flight updated successfully!',success:true })
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - updatePut method' })
    }
  }

  public async updatePatch({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      const data = await request.validate(FlightPatchValidator)
      const flight = await FlightRepository.updateFlightPatch(id, data)
      return response.status(200).json({ data: flight, message: 'Flight patched successfully!',success:true })
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - updatePatch method' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(FlightIdValidator)
      await FlightRepository.deleteFlight(id)
      return response.status(200).json({ message: 'Flight deleted successfully!',success:true })
    } catch (err) {
      throw Object.assign(err, { location: 'AirportController - destroy method' })
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
      throw Object.assign(err, { location: 'AirportController - departureAirport method' })
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
      throw Object.assign(err, { location: 'AirportController - withBookings method' })
    }
  }
}
