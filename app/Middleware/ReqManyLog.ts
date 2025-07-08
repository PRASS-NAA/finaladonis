import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReqManyLog {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    console.log(` a bulk ${request.method()} was made , be careful !!`)
    await next()
  }
}
