import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PassengerPatchValidator {
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
    name: schema.string.optional({}, [
      rules.alpha(),
    ]),
    email: schema.string.optional({},[
      rules.email()
    ])
  })

  public messages: CustomMessages = {
    string: ' {{ field }} must be a string ',

    'name.alpha': 'name must contain only alphabets !! ',

    'email.email': ' enter valid email format'
  }
}
