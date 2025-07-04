import Route from "@ioc:Adonis/Core/Route"

Route.group(() =>
{
  Route.get('/','AirportsController.index');
  Route.get('/:id','AirportsController.show');
  Route.post('/','AirportsController.store');
  Route.put('/:id','AirportsController.updatePut');
  Route.patch('/:id','AirportsController.updatePatch');
  Route.delete('/:id','AirportsController.destroy');

  // three more routes to be added
}).prefix('/airports')
