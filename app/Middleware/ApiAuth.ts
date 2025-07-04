import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import Env from "@ioc:Adonis/Core/Env"
export default class ApiAuth {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const clientKey = request.header('Authorization');
    const serverKey = Env.get('API_KEY');

    if(!clientKey || serverKey != clientKey)
    {
      return response.unauthorized("Invalid or Missing API KEY !! ");
    }
    await next()
  }
}
