import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AirportIdAndPatchValidator {
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
    id:schema.number([
      rules.exists({table:'airports',column:'id'})
    ]),
    name:schema.string.optional(),
    code:schema.string.optional({}, [
      rules.minLength(2),
      rules.maxLength(3),
    ]),
    city:schema.string.optional(),
    country:schema.string.optional()
  })

  public messages: CustomMessages = {
    required: '{{ field }} is a required field !! ',
    string: '{{ field }} must be a string !!',
    'id.exists': 'id must exist in DB !! ',

    'code.minLength':'code must be of Length 3 !! eg: DXB , LAX',
    'code.maxLength':'code must be of Length 3 !! eg: DXB , LAX'
  }
}
