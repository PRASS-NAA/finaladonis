import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PassengerQValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    passengerName: schema.string.optional({}, [
      rules.alpha()
    ]),

    passengerEmail: schema.string.optional({}, [
      rules.email()
    ])
  })

  public messages: CustomMessages = {
    'passengerName.alpha': 'Passenger name must contain only alphabetic characters!',
    'passengerEmail.email': 'Passenger email must be a valid email address!'
  }

  public data = this.ctx.request.qs();
}
