'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500; // ms
  
  var lastTimeout = null;
  window.debounce = function (fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  };

})();