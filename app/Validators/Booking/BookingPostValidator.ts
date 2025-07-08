import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BookingPostValidator {
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
    passengerId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'passengers', column: 'id' }),
    ]),
    flightId: schema.number([
      rules.unsigned(),
      rules.exists({ table: 'flights', column: 'id' }),
    ]),
    seatNumber: schema.number([rules.range(1,35)]),
  })

  public messages: CustomMessages = {

    required:'{{ field }} is required !!! ',
    exists:' {{ field }} must exist in its parent table !! ',

    'seatNumber.number': ' seat number must be integer',
    'setNumber.range' : 'seat number must be between 1 and 35 '

  }
}
