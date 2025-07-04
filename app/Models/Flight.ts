import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Booking from './Booking'
import Airport from './Airport'

export default class Flight extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public flightNumber: string

  @column({columnName:'d_airport_id'})
  public departureAirportId: number

  @column({columnName: 'a_airport_id'})
  public arrivalAirportId: number

  @column()
  public departureTime: DateTime

  @column()
  public arrivalTime: DateTime

  @hasMany(() => Booking)
  public bookings: HasMany<typeof Booking>

  @belongsTo(() => Airport, {foreignKey:'departureAirportId'})
  public departureAirport : BelongsTo<typeof Airport>

  @belongsTo(() => Airport, {foreignKey: 'arrivalAirportId'})
  public arrivalAirport : BelongsTo<typeof Airport>
}
