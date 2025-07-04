import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AirportPatchValidator from 'App/Validators/AirportPatchValidator';
import AirportPostValidator from 'App/Validators/AirportPostValidator';
import IdPathParamValidator from 'App/Validators/IdPathParamValidator'
import AirportRepository from 'App/Repository/AirportRepository';
import GetqValidator from 'App/Validators/GetqValidator';


export default class AirportsController {


  public async index({request, response} : HttpContextContract){

    const { col, sort } = await request.validate(GetqValidator);

    try{
      let airports;
      if(col && sort )
      {
        airports = await AirportRepository.getAirportBySpecificCol(col,sort);
      }else{
        airports = await AirportRepository.getAllAirport();
      }
      return response.status(200).json(airports)

    }catch(error)
    {
      return response.status(500).send({message:'Error occurred while fetching from DB', error:error.message})
    }
  }



  public async show({request,response} : HttpContextContract){


    const {id} = await request.validate(IdPathParamValidator);
    try{
      const airport = await AirportRepository.getAirportById(id);
      return response.status(200).send(airport)
    }catch(err)
    {
      if(err.code === 'E_ROW_NOT_FOUND')
      {
        return response.status(404).send({ message: 'Airport not found', error: err.message });
      }else{
      return response.status(500).send({ message: "Error fetching data from DB", error: err.message });
      }
    }
  }



  public async store({request,response} : HttpContextContract){


    const airportDetails = await request.validate(AirportPostValidator);

    try{
      const newAirport = await AirportRepository.createAirport(airportDetails);
      return response.status(201).send({message: ' succesfully inserted data into DB !', data: newAirport});
    }catch(err)
    {
      return response.status(500).send({message:'error occurred while inserting data in DB ', error:err.message})
    }
  }



  public async updatePut({request, response} : HttpContextContract){


    const { id } = await request.validate(IdPathParamValidator);
    const payload = await request.validate(AirportPostValidator);

    try{

      const updatedAirport = await AirportRepository.airportUpdate(id, payload);
      return response.status(200).send({message:'Airport successfully updated fully !! ', data:updatedAirport});
    }catch(err)
    {
      if(err.code === 'E_ROW_NOT_FOUND')
      {
        return response.status(404).send({ message: 'Airport not found', error: err.message });
      }else{
        return response.status(500).send({message:'error occured while patch operation of airport in DB !! ', error: err.message});
      }
    }
  }



  public async updatePatch({request, response} : HttpContextContract){


    try{
      const { id } = await request.validate(IdPathParamValidator);

      const payload = await request.validate(AirportPatchValidator);

      const updatedAirport = await AirportRepository.airportUpdate(id, payload);
      return response.status(200).send({message:'airport partially updated successfully !! ', data:updatedAirport});

    }catch(err)
    {
      /*if(err.code === 'E_ROW_NOT_FOUND')
      {
        return response.status(404).send({ message: 'Airport not found', error: err.message });
      }else{
        return response.status(500).send({message:'error occured while patch operation of airport in DB !! ', error: err.message});
      }*/

        throw err;

    }
  }



  public async destroy({request, response} : HttpContextContract){

    const { id } = await request.validate(IdPathParamValidator);

    try{
      const deletedAirport = await AirportRepository.airportDelete(id);
      return response.status(200).send({message:'Airport successfully deleted ! ',data:deletedAirport});

    }catch(err)
    {
      if(err.code === 'E_ROW_NOT_FOUND')
      {
        return response.status(404).send({ message: 'Airport not found', error: err.message });
      }else{
        return response.status(500).send({message:'error occurred while deleting airport in DB !! ', error: err.message});
      }
    }
  }




}
