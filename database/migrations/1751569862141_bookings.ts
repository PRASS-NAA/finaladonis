import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
      .integer('passenger_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('passengers')
      .onDelete('CASCADE')


      table
      .integer('flight_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('flights')
      .onDelete('CASCADE')


      table.string('seat_number')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
