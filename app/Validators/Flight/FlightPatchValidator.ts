import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FlightPatchValidator {
  constructor(protected ctx: HttpContextContract) {
    const body = ctx.request.body()

    for(let key in body)
    {
      const value = body[key]

      if(typeof value === "string" )
      {
        body[key] = value.toLowerCase()
      }
    }

    this.ctx.request.updateBody(body);
  }

  public schema = schema.create({
    flightNumber: schema.string.optional(),
    departureAirportId: schema.number.optional([
      rules.exists({ table: 'airports', column: 'id' }),
    ]),
    arrivalAirportId: schema.number.optional([
      rules.exists({ table: 'airports', column: 'id' }),
    ]),
    departureTime: schema.string.optional(),
    arrivalTime: schema.string.optional(),
  })

  public messages: CustomMessages = {
    'departureAirportId.exists': 'Departure airport must exist',
    'arrivalAirportId.exists': 'Arrival airport must exist',
  }
}
