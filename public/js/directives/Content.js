function Content () {
  return {
    restrict: 'E',
    templateUrl: 'templates/content.html'
  }
}
angular
  .module('app')
  .directive('content', Content)