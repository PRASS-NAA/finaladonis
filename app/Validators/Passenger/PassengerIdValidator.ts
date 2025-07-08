import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PassengerIdValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id:schema.number([rules.unsigned(),
      rules.exists({table:'passengers', column:'id'})
    ])
  })

  public messages: CustomMessages = {
    'id.required':'ID is Required !!',
    'id.number':'ID must be an integer',
    'id.unsigned':'ID must be  a positive number',
    'id.exists':'Enter a valid ID that exists in DB !!'
  }

  public data = this.ctx.params;
}
