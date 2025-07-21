import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class Jwtauth {
  public async handle({response, request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const authHeader = request.header('Authorization')

    console.log(authHeader)
    if(!authHeader)
    {
      throw new Error('NO TOKEN !! ')
    }

    let token = authHeader.replace('Bearer','').trim()
    token = authHeader.split(' ')[1]
    console.log(token)
    try{
      console.log(Env.get('JWT_SECRET'))
      const decoded = jwt.verify(token,Env.get('JWT_SECRET'))
      await next()
    }catch(err)
    {
      throw err;
    }

  }
}
