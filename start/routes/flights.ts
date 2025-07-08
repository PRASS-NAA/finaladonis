import Route from "@ioc:Adonis/Core/Route";

Route.group(() =>
{
  Route.get('/','FlightsController.index');
  Route.get('/with-bookings/:id', 'FlightsController.withBookings');
  Route.get('/:id','FlightsController.show');
  Route.post('/','FlightsController.store');
  Route.put('/:id','FlightsController.updatePut');
  Route.patch('/:id','FlightsController.updatePatch');
  Route.delete('/:id','FlightsController.destroy');

  Route.get('/:id/departure-airport', 'FlightsController.departureAirport');

}).prefix('/flights');
