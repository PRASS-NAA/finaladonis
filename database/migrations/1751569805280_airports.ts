import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Airports extends BaseSchema {
  protected tableName = 'airports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable().unique()
      table.string('code').notNullable().unique()
      table.string('city').notNullable()
      table.string('country').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
