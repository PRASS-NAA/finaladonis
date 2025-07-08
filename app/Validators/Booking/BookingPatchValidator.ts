import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BookingPatchValidator {
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
    passengerId: schema.number.optional([
      rules.unsigned(),
      rules.exists({ table: 'passengers', column: 'id' }),
    ]),
    flightId: schema.number.optional([
      rules.unsigned(),
      rules.exists({ table: 'flights', column: 'id' }),
    ]),
    seatNumber: schema.number.optional([rules.range(1,35)]),
  })

  public messages: CustomMessages = {
    exists:' {{ field }} must exist in its parent table !! ',

    'seatNumber.number': ' seat number must be integer',
    'setNumber.range' : 'seat number must be between 1 and 35 '

  }
}
