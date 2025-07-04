import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddColFlights extends BaseSchema {
  protected tableName = 'flights'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('arrival_time')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName ,(table) =>
    {
      table.dropColumn('arrival_time')
    })
  }
}
