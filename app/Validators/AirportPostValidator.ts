import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AirportPostValidator {
  constructor(protected ctx: HttpContextContract) {}

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
    'name.required':'Name is a required field !!',
    'code.required':'code is a required field !!',
    'city.required':'city is a required field !!',
    'country.required':'country is a required field !!',

    'name.string':'name must be a string !!',
    'code.string':'code must be a string !!',
    'city.string':'city must be a string !!',
    'country.string':'country must be a string !!',

    'code.minLength':'code must be of Length 3 !! eg: DXB , LAX',
    'code.maxLength':'code must be of Length 3 !! eg: DXB , LAX'
  }
}
