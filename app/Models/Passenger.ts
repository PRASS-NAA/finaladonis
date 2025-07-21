import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'


export default class Passenger extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string
}
