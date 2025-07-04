import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AirportPatchValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name:schema.string.optional(),
    code:schema.string.optional({}, [
      rules.minLength(2),
      rules.maxLength(3)
    ]),
    city:schema.string.optional(),
    country:schema.string.optional()
  })


  public messages: CustomMessages = {
    'name.string':'name must be a string !!',
    'code.string':'code must be a string !!',
    'city.string':'city must be a string !!',
    'country.string':'country must be a string !!',

    'code.minLength':'code must be of Length 3 !! eg: DXB , LAX',
    'code.maxLength':'code must be of Length 3 !! eg: DXB , LAX'
  }
}
