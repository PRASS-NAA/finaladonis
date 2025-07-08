import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AirportIdAndUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id:schema.number([ rules.unsigned(),
      rules.exists({table:'airports',column:'id'})
    ]),
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
    string: '{{ field }} must be a string !!',


    'id.exists': 'id must exist in DB !! ',
    'id.number':'ID must be a number only ',
    'id.unsigned':'ID must be a positive number only',


    'code.minLength':'code must be of Length 3 !! eg: DXB , LAX',
    'code.maxLength':'code must be of Length 3 !! eg: DXB , LAX'
  }
}
