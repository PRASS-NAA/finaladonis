import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IdPathParamValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id:schema.number([rules.unsigned(),
      rules.exists({table:'airports', column:'id'})
    ])
  })

  public messages: CustomMessages = {
    'id.required':'ID is Mandatory',
    'id.number':'ID must be a number only ',
    'id.unsigned':'ID must be a positive number only',
    'id.exists':'ID doesnt exist in the DB'
  }

  public data = this.ctx.params;
}
