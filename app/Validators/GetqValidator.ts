import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetqValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    col:schema.enum.optional((['id','name','code','city','country'])),
    sort:schema.enum.optional((['asc','desc']))
  })

  public messages: CustomMessages = {
    'col.enum':'value of col must be either id, name, code, city, country only !!',
    'sort.enum':'sort must be either asc or desc only !!'
  }

  public data = this.ctx.request.qs();
}
