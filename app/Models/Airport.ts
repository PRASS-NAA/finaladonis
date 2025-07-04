
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Flight from './Flight'

export default class Airport extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public code:string

  @column()
  public city:string

  @column()
  public country:string

  @hasMany(() => Flight, {foreignKey: 'departureAirportId'})
  public departingFlights: HasMany<typeof Flight>

  @hasMany(() => Flight, {foreignKey: 'arrivalAirportId'})
  public arrivingFlights: HasMany<typeof Flight>
}
