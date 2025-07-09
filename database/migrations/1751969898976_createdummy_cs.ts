import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatedummyCs extends BaseSchema {
  protected tableName = 'createdummy_cs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('internsip').notNullable().defaultTo(true)

      table.string('name').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
