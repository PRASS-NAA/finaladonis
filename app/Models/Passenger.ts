
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Booking from './Booking'


export default class Passenger extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @hasMany(() => Booking)
  public bookings: HasMany<typeof Booking>
}
