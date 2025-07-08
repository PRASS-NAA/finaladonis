import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FlightPostValidator {
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
    flightNumber: schema.string(),
    departureAirportId: schema.number([
      rules.exists({ table: 'airports', column: 'id' }),
    ]),
    arrivalAirportId: schema.number([
      rules.exists({ table: 'airports', column: 'id' }),
    ]),
    departureTime: schema.string(), // ISO format expected but checked in repo
    arrivalTime: schema.string(),
  })

  public messages: CustomMessages = {

    required:'{{ field }} is required !! ',
    exists:'{{ field }} should exist in parent table '
  }
}
