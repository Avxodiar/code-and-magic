'use strict';

(function() {

//блок Настройки
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector("#similar-wizard-template").content;

// генерация похожих персонажей для окна настроек
createWizardList();

/**
 * Создание списка похожих персонажей
 * @param  int count - количество
 */
function createWizardList(count) {
  count = Math.abs(parseInt(count)) | 4;
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < count; i++) {
    var person = cloneWizard( generatePerson() );
    fragment.appendChild( person );
  }
  setupSimilarList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
}

/**
 * Генерирация характеристик/описания персонажа
 * @return object
 */
function generatePerson() {
  var person = {};
  for (var prop in window.wizards.getPersons() ) {
    var params = window.wizards.getPersonParam(prop);
    var randomId = Math.floor( Math.random() * params.length );
    person[prop] = params[randomId];
  }
  return person;
}

/**
 * Клонирование шаблона волшебника по переданному описанию
 * @param  object clone - объект с описанием волшебника
 * @return document fragment
 */
function cloneWizard(person) {
  var wizardClone = wizardTemplate.cloneNode(true);

  wizardClone.querySelector('.setup-similar-label').textContent = person.name + ' ' + person.family;
  wizardClone.querySelector('.wizard-coat').style.fill = person.coatColor;
  wizardClone.querySelector('.wizard-eyes').style.fill = person.yeysColor;

  return wizardClone;
}

})();