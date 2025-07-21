import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPasswords extends BaseSchema {
  protected tableName = 'passengers'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName , (table) => {
      table.dropColumn('password')
    })
  }
}
