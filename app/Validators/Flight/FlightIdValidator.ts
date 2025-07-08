import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FlightIdValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'flights', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'id.required': 'Flight ID is required',
    'id.number': 'Flight ID must be a positive number',
    'id.unsigned': 'Flight ID must be positive',
    'id.exists': 'Flight ID does not exist in the database',
  }

  public data = this.ctx.params
}
