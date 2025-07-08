import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsertManyValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    airports: schema.array().members(
      schema.object().members({
        name: schema.string(),
        code: schema.string({}, [
          rules.minLength(2),
          rules.maxLength(3),
        ]),
        city: schema.string(),
        country: schema.string(),
      })
    ),
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required!',
    string: '{{ field }} must be a valid string!',

    'airports.array': '{{ field }} must be an array!',

    minLength: '{{ field }} must be at least {{ options.minLength }} characters long.',
    maxLength: '{{ field }} must not exceed {{ options.maxLength }} characters.',
  }
}
