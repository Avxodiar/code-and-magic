'use strict';

(function() {
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var VALIDY_STATE = {
    valueMissing: 'Не заполнено обязательное поле',
    tooShort: 'Имя должно состоять минимум из 2-х символов',
    tooLong: 'Имя не должно превышать 25-ти символов',
    badInput: 'Введено неправильное значение',
  }

  window.utils = {
    isEscKeycode: function(evt) {
      return evt.keyCode == KEYCODE_ESC;
    },
    isEnterKeycode: function(evt) {
      return evt.keyCode == KEYCODE_ENTER;
    },
    getValidyState: function(validiStates) {
      for( var state in VALIDY_STATE ) {
        if ( validiStates[state] ) {
          return VALIDY_STATE[state];
        }
      }
      return false;
    },
    getValidyMess: function(state) {
      return ( VALIDY_STATE[state] ) ? VALIDY_STATE[state] : '';
    }
  };

})();