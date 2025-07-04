import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Passengers extends BaseSchema {
  protected tableName = 'passengers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
