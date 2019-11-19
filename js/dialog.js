'use strict';

(function() {

//блок Настройки
var setup = document.querySelector('.setup');
var setupUserName = document.querySelector('.setup-user-name');

// перемещение блока настроек за иконку пользователя в настройках
var dialogHandler = setup.querySelector('.upload');
var movingDiv = setup.querySelector('.setup-moving');

dialogHandler.addEventListener('mousedown',onSetupMoving);
movingDiv.addEventListener('mousedown',onSetupMoving);

//Начало перемещения окна
function onSetupMoving (evt) {
  evt.preventDefault();
  setupUserName.blur();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // флаг переноса - событие привязно к 2ум элементам из которых 1 активный (input)
  var dragged = false;

  // перемещение
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    }

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    }
    setup.style.top = ( setup.offsetTop - shift.y) + 'px';
    setup.style.left = ( setup.offsetLeft - shift.x) + 'px';
    movingDiv.style.cursor = 'move';
  }

  // завершение перемещения
  var onMouseUp = function(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    movingDiv.style.cursor = '';

    if (dragged) {
      var onClickPreventDefault = function(evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      }
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

})();