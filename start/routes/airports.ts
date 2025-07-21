import Route from "@ioc:Adonis/Core/Route"

Route.group(() =>
{
  Route.get('/','AirportsController.index');
  Route.get('/:id','AirportsController.show');
  Route.post('/','AirportsController.store');
  Route.put('/:id','AirportsController.updatePut');
  Route.patch('/:id','AirportsController.updatePatch');
  Route.delete('/bulkDelete', 'AirportsController.deleteMany').middleware(['logReq'])
  Route.delete('/:id','AirportsController.destroy');

  Route.get('/departing-flights/:id', 'AirportsController.departingFlights')
  Route.get('/arriving-flights/:id', 'AirportsController.arrivingFlights')

  Route.post('/bulk', 'AirportsController.insertMany').middleware('logReq')


}).prefix('/airports').middleware(['jwtAuth'])
