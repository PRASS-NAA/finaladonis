import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AirportPostValidator from 'App/Validators/Airport/AirportPostValidator';
import AirportIdValidator from 'App/Validators/Airport/AirportIdValidator';
import AirportRepository from 'App/Repository/AirportRepository';
import AirportQValidator from 'App/Validators/Airport/AirportQValidator';
import AirportIdAndUpdateValidator from 'App/Validators/Airport/AirportIdAndUpdateValidator';
import AirportIdAndPatchValidator from 'App/Validators/Airport/AirportIdAndPatchValidator';
import AirportDeleteManyValidator from 'App/Validators/Airport/AirportDeleteManyValidator';
import InsertManyValidator from 'App/Validators/Airport/InsertManyValidator';

export default class AirportsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { col, sort } = await request.validate(AirportQValidator);

      const airports = (col && sort)
        ? await AirportRepository.getAirportBySpecificCol(col, sort)
        : await AirportRepository.getAllAirport();

      return response.status(200).send({ data: airports, message: 'Airports fetched successfully!', success:true });
    } catch (err) {
      console.log("Error in AirportController - index method");
      throw err;
    }
  }

  public async show(ctx : HttpContextContract) {
    try {

      const validator = new AirportIdAndPatchValidator(ctx);
      const p_id = ctx.params.id;

      const { id } = await ctx.request.validate({
        schema: validator.schema,
        data: { id: p_id },
        messages: validator.messages
        });
      const airport = await AirportRepository.getAirportById(id);

      return ctx.response.status(200).send({ data: airport, message: 'Airport fetched successfully!',success:true });
    } catch (err) {
      console.log("Error in AirportController - show method");
      throw err;
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const airportDetails = await request.validate(AirportPostValidator);

      const newAirport = await AirportRepository.createAirport(airportDetails);

      return response.status(201).send({ data: newAirport, message: 'Airport successfully created!',success:true });
    } catch (err) {
      console.log("Error in AirportController - store method");
      throw err;
    }
  }

  public async updatePut(ctx: HttpContextContract) {
    try {

      const updateValidator = new AirportIdAndUpdateValidator(ctx);
      /*const { id } = await ctx.request.validate(AirportIdValidator);
      const payload = await ctx.request.validate(AirportPostValidator);*/

      let id = ctx.params.id;

      let reqBody = ctx.request.only(['name','code','city','country']);
      let dataToValidate = {
        id, ...reqBody
      }
      const payload = await ctx.request.validate({
        schema:updateValidator.schema,
        data:dataToValidate,
        messages:updateValidator.messages
      })

      const updatedAirport = await AirportRepository.airportUpdate(id, payload);

      return ctx.response.status(200).send({ data: updatedAirport, message: 'Airport fully updated successfully!',success:true });
    } catch (err) {
      console.log("Error in AirportController - updatePut method");
      throw err;
    }
  }

  public async updatePatch(ctx: HttpContextContract) {
    try {
      /*const { id } = await request.validate(AirportIdValidator);
      const payload = await request.validate(AirportPatchValidator);*/

      const id = ctx.params.id;

      const reqBody = ctx.request.body();

      const dataToBeValidated = {
        id,
        ...reqBody
      }

      const validator = new AirportIdAndPatchValidator(ctx);

      const payload = await ctx.request.validate(
        {
          schema:validator.schema,
          data:dataToBeValidated,
          messages:validator.messages
        }
      )
      const updatedAirport = await AirportRepository.airportUpdate(id, payload);

      return ctx.response.status(200).send({ data: updatedAirport, message: 'Airport partially updated successfully!',success:true });
    } catch (err) {
      console.log("Error in AirportController - updatePatch method");
      throw err;

    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const { id } = await request.validate(AirportIdValidator);

      const deletedAirport = await AirportRepository.airportDelete(id);

      return response.status(200).send({ data: deletedAirport, message: 'Airport successfully deleted!',success:true });
    } catch (err) {
      console.log("Error in AirportController - destroy method");
      throw err;
    }
  }

  public async departingFlights({ params, request, response }: HttpContextContract) {
    try{

      const { id } = await request.validate(AirportIdValidator)
      const airport = await AirportRepository.loadDepartingFlights(id)

      return response.json({
      message: `Departing flights from airport ${airport.id} loaded successfully!`,
      airport: airport.name,
      flights: airport.departingFlights,success:true
    })
    }catch(err)
    {
      console.log("Error in AirportController - departingFlights method");
      throw err;
    }
  }

  public async arrivingFlights({ params, request, response }: HttpContextContract) {
    try{
      const { id } = await request.validate(AirportIdValidator)
      const airport = await AirportRepository.loadArrivingFlights(id)

    return response.json({
      message: `Arriving flights at airport ${airport.id} loaded successfully!`,
      airport: airport.name,
      flights: airport.arrivingFlights,success:true
    })
    }catch(err)
    {
      console.log("Error in AirportController - arrivingFlight method");
      throw err;
    }
  }

  public async insertMany(ctx: HttpContextContract) {
    try {

    const { airports } = await ctx.request.validate(InsertManyValidator)


    const inserted = await AirportRepository.insertBulk(airports)

    return ctx.response.status(201).json({
      message: 'Airports inserted successfully',
      data: inserted,
      success: true,
    })
  } catch (err) {
    console.log("Error in AirportController - insertMany method");
    throw err
  }
}


  public async deleteMany(ctx : HttpContextContract)
  {
    try{
      const { ids } = await ctx.request.validate(AirportDeleteManyValidator);

      if(!Array.isArray(ids) || ids.length == 0)
      {
        throw new Error(' In bulk Delete give array of ids !!');
      }

      const deletedCount = await AirportRepository.deleteBulk(ids);

      return ctx.response.status(200).json({message: `Deleted ${deletedCount} airport(s) successfully`,success: true})
    }catch(err)
    {
      console.log("Error in AirportController - deleteMany method");
      throw err;
    }
  }
}
