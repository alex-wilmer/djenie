function config ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'Main'
  })
  $locationProvider.html5Mode(true)
}
angular
  .module('app')
  .config(config)