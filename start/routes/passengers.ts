import Route from "@ioc:Adonis/Core/Route";


Route.post('/login', 'PassengersController.login');

Route.group(() =>
{
  Route.get('/','PassengersController.index');
  Route.get('/:id','PassengersController.show');
  Route.post('/','PassengersController.store')
  Route.put('/:id','PassengersController.updatePut');
  Route.patch('/:id','PassengersController.updatePatch');
  Route.delete('/:id','PassengersController.destroy');
}).prefix('/passengers').middleware(['jwtAuth']);
