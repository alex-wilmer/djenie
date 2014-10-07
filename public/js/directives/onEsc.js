function onEsc() {
   return function(scope, element, attrs) {
      function applyKeyup() {
         scope.$apply(attrs.onEsc)
      }         
        
      element.bind('keyup', function(evt) {
         if (evt.which == 27) {
                applyKeyup();
         }
      })
   }
}

angular
   .module('app')
   .directive('onEsc', onEsc)