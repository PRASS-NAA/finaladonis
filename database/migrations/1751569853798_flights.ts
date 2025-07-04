import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Flights extends BaseSchema {
  protected tableName = 'flights'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('flight_number').notNullable().unique()

      table
      .integer('d_airport_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('airports')
      .onDelete('CASCADE')

      table
      .integer('a_airport_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('airports')
      .onDelete('CASCADE')

      table.dateTime('departure_time').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
