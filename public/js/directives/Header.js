function Header () {
  return {
    restrict: 'E',
    templateUrl: 'templates/header.html'
  }
}
angular
  .module('app')
  .directive('header', Header)