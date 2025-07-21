import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    email: schema.string({}, [
      rules.email()
    ]),
    password: schema.string({})
  })
  public messages: CustomMessages = {
    required: '{{ field }} is a required field !! ',
    string : '{{ field }} must be of type  string !! ',

    'email.email' : '{{ field }} must be of type string !! '
  }
}
