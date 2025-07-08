/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle(error, { response }) {
    // Handle Adonis-specific validation errors
    if (error.code === 'E_VALIDATION_FAILURE') {
      return response.status(422).send({
        status: 'error',
        message: 'Validation failed',
        errors: error.messages,
        success:false
      })
    }

    if(error.type == "DatabaseError")
    {
      return response.status(500).send({
        status: 'error',
        message: 'DB operation failed',
        errors: error.messages,
        success:false
      })
    }

    // Handle HTTP exceptions like 404, 403, etc. that have a status property
    if (error.status) {
      return response.status(error.status).send({
        status: 'error',
        message: error.message,
        success:false
      })
    }

    Logger.error('Unhandled exception', error)

    return response.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      success:false
    })
  }
}

