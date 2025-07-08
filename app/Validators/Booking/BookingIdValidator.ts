import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BookingIdValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'bookings', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'id.required': 'Booking ID is required',
    'id.number': 'Booking ID must be a positive number',
    'id.exists': 'Booking ID does not exist in the database',
  }

  public data = this.ctx.params; // reads from path params
}
