
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Flight from './Flight'
import Passenger from './Passenger'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public passengerId: number

  @column()
  public flightId: number

  @column()
  public seatNumber: string

  @belongsTo(() => Flight)
  public flight: BelongsTo<typeof Flight>

  @belongsTo(() => Passenger)
  public passenger: BelongsTo<typeof Passenger>
}
