'use strict';

( function() {

// кнопка Настройки
var buttonSetup = document.querySelector('.setup-open');

//блок Настройки
var setup = document.querySelector('.setup');
var setupUserName = document.querySelector('.setup-user-name');
var buttonCloseSetup = setup.querySelector('.setup-close');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setup.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector("#similar-wizard-template").content;

var setupWizard = setup.querySelector('.setup-wizard');
var setupFireball = setup.querySelector('.setup-fireball-wrap');

buttonSetup.addEventListener('click', evtShowSetup );
buttonSetup.addEventListener('keydown', evtShowSetupEnterPress );


setupUserName.addEventListener('invalid', function(evt) {
  var mess = window.utils.getValidyState( evt.target.validity );
  if( mess ) {
    evt.target.setCustomValidity( mess );
  }
} );

setupUserName.addEventListener('input', function(evt) {
  var mess  = (evt.target.value.length < 2 ) ? window.utils.getValidyMess('tooShort') : '';
  evt.target.setCustomValidity( mess );
});

// форма Настройки
var setupForm = document.querySelector('.setup-wizard-form');

//Отправка формы Настройка без перезагрузки страницы
setupForm.addEventListener('submit', function(evt) {
  window.backend.save(
    new FormData(setupForm),
    function(response) {
      evtCloseSetup();
    },
    function(errorMessage) {
      alert('Ошибка записи данных!\n' + errorMessage);
    }
  );
  evt.preventDefault();
});


/**
 * Показ окна Настройки
 */
function evtShowSetup() {
  setup.classList.remove('hidden');
  //setupUserName.focus();
  document.addEventListener('keydown', evtCloseSetupEscPress );
  document.addEventListener('keydown', evtFormSubmitEnterPress );
  buttonCloseSetup.addEventListener('click', evtCloseSetup );
  buttonCloseSetup.addEventListener('keydown', evtCloseSetupEnterPress );
  setupWizard.addEventListener('click', evtWizardColorChange );
  setupFireball.addEventListener('click', evtWizardColorChange );
}

/* Закрытие окна Настройки */
function evtCloseSetup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', evtCloseSetupEscPress );
  document.removeEventListener('keydown', evtFormSubmitEnterPress );
  setupWizard.removeEventListener('click', evtWizardColorChange );
  setupFireball.removeEventListener('click', evtWizardColorChange );
}

/**
 * Изменение цвета на активных элементах волшебника или посохе
 * Обертка для избежания потери контекста this при вызове из колбека
*/
function evtWizardColorChange(evt) {
  window.wizards.changeColor(evt);
}

/* Показ по нажатию ENTER */
function evtShowSetupEnterPress(evt) {
  if(window.utils.isEnterKeycode(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    evtShowSetup();
  }
}
/* Закрытие по нажатию ESC */
function evtCloseSetupEscPress(evt) {
  if( (window.utils.isEscKeycode(evt)  || window.utils.isEnterKeycode(evt) )  && evt.target != setupUserName ) {
    evtCloseSetup();
  }
}
/* Закрытие по нажатию Enter на кнопке закрыть */
function evtCloseSetupEnterPress(evt) {
  if(window.utils.isEnterKeycode(evt)) {
    evtCloseSetup();
  }
}

/* отправка формы по нажатию Enter на кнопке отправить*/
function evtFormSubmitEnterPress(evt) {
  if(window.utils.isEnterKeycode(evt)) {
    if ( evt.target == setupUserName ) {
      evt.preventDefault();
    }
  }
}

})();