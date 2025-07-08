import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class AirportDeleteManyValidator {
  constructor(protected ctx) {}

  public schema = schema.create({
    ids: schema.array([rules.minLength(1)]).members(
      schema.number([rules.unsigned(),rules.exists({table:'airports', column:'id'})])
    ),
  })

  public messages: CustomMessages = {
    'ids.required': 'Provide ids array!',
    'ids.array': 'Ids must be an array!',
    'ids.minLength': 'Provide at least one id!',
    'ids.*.number': 'Each id must be a number!',
    'ids.*.unsigned': 'Ids must be positive numbers!',
    'ids.*.exists': 'Id must exist in DB'
  }
}
