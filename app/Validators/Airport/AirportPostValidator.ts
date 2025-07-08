import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AirportPostValidator {
  constructor(protected ctx: HttpContextContract) {
    const body = this.ctx.request.body()

    for (let key in body) {
      const value = body[key]

      if (typeof value === 'string') {
        if (key === 'code') {
          body[key] = value.toUpperCase()
        } else {
          body[key] = value.toLowerCase()
        }
      }
  }

      this.ctx.request.updateBody(body)
  }

  public schema = schema.create({
    name:schema.string(),
    code:schema.string({}, [
      rules.minLength(2),
      rules.maxLength(3)
    ]),
    city:schema.string(),
    country:schema.string()
  })

  public messages: CustomMessages = {

    required: '{{ field }} is a required field !! ',
    string: ' {{ field }} must be a string !! ',

    'code.minLength':'code must be of Length 3 !! eg: DXB , LAX',
    'code.maxLength':'code must be of Length 3 !! eg: DXB , LAX'
  }
}
