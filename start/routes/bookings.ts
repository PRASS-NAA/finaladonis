import Route from "@ioc:Adonis/Core/Route";

Route.group(() =>
{
  Route.get('/','BookingsController.index');
  Route.get('/:id','BookingsController.show');
  Route.post('/','BookingsController.store');
  Route.put('/:id','BookingsController.updatePut');
  Route.patch('/:id','BookingsController.updatePatch');
  Route.delete('/:id','BookingsController.destroy');
}).prefix('/bookings').middleware(['apiAuth']);
