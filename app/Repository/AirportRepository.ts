import Database from "@ioc:Adonis/Lucid/Database";
import Airport from "App/Models/Airport";


export default class AirportRepository{


  static async getAllAirport()
  {
    let airports;

    airports = await Airport.all();

    return airports;
  }

  static async getAirportById(id)
  {
    let airport = await Airport.findOrFail(id);

    return airport;
  }

  static async createAirport(airportDetails)
  {
    const { name , code, city, country } = airportDetails;

    const airport = await Airport.create({
      name:name,
      code:code,
      city:city,
      country:country
    });

    return airport;
  }

  static async getAirportBySpecificCol(col,sort)
  {
    let airports;
    if(sort == "asc")
    {
      airports = await Airport.query().orderBy(`${col}`,'asc')
    }else if(sort == "desc"){
      airports = await Airport.query().orderBy(`${col}`,'desc')
    }

    return airports;
  }

  static async airportUpdate(id, airportDetails)
  {
    const putAirport = await Airport.findOrFail(id);

    putAirport.merge(airportDetails);

    await putAirport.save();

    return putAirport;
  }

  static async airportDelete(id)
  {
    const delAirport = await Airport.findOrFail(id);

    await delAirport.delete();

    return delAirport;
  }

  public static async loadDepartingFlights(airportId: number) {
    const airport = await Airport.findOrFail(airportId)
    await airport.load('departingFlights')
    return airport
  }

   public static async loadArrivingFlights(airportId: number) {
    const airport = await Airport.findOrFail(airportId)
    await airport.load('arrivingFlights')
    return airport
  }

  public static async insertBulk(airports)
  {
    return await Airport.createMany(airports);
  }

  public static async deleteBulk(ids)
  {
    const deleted = await Database.from('airports').whereIn('id',ids).delete();

    return deleted;
  }
}
