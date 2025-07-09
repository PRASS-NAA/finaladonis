import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatedummyAs extends BaseSchema {
  protected tableName = 'createdummy_a'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.integer('age')
      table.string('role').notNullable().defaultTo("sde")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
