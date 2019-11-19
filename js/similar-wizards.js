'use strict';

(function() {

//блок Настройки
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector("#similar-wizard-template").content;
var setupError = document.querySelector("#setup-error");

setupError.addEventListener('click', function() {
  setupError.classList.add('hidden');
});

// загрузка персонажей с сервера или генерация похожих персонажей для окна настроек
window.backend.load(
  function(wizards) {
    console.info('Загружены скучные персонажи для демонстрации');
    showError('Загружены скучные персонажи для демонстрации');
    console.warn('Но кому это интересно? Генерируем новые имена');
    renameWizards(wizards);
    console.table(wizards);
    createWizardList(wizards);
  },
  function(errorMessage) {
    showError('Ошибка загрузки персонажей с сервера: '+ errorMessage);
    createWizardList();
    console.warn('Сгенерированы похожие персонажи для демонстрации');
  }
);

function showError(errorMessage) {
  setupError.innerText = errorMessage;
  setupError.classList.remove('hidden');
}

/**
 * Загрузка или создание списка похожих персонажей
 * @param  object arWizard - загруженные/сгенерированные персонажи
 * @param  int    count    - количество
 */
function createWizardList(arWizard, count) {
  arWizard = (typeof arWizard == 'object') ? arWizard : [];
  count = Math.abs(parseInt(count)) | 4;

  var wizard, person;
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < count; i++) {
    wizard = (arWizard[i]) ? arWizard[i] : generatePerson();
    person = cloneWizard( wizard );
    fragment.appendChild( person );
  }
  setupSimilarList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
}

/**
 * Переименование персонажей в загруженном списке
 * @param  object arWizard - загруженные/сгенерированные персонажи
 */
function renameWizards(arWizard) {
  var names = window.wizards.getPersonParam('name');
  var families = window.wizards.getPersonParam('family');
  var randomId;
  for (var i in arWizard ) {
    randomId = Math.floor( Math.random() * names.length );
    arWizard[i]['name'] = names[randomId];
    randomId = Math.floor( Math.random() * families.length );
    arWizard[i]['family'] = families[randomId];
  }
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

  var name = person.name;
  if (person.family) {
    name += ' ' + person.family;
  }
  wizardClone.querySelector('.setup-similar-label').textContent = name;
  wizardClone.querySelector('.wizard-coat').style.fill = person.colorCoat;
  wizardClone.querySelector('.wizard-eyes').style.fill = person.colorEyes;

  return wizardClone;
}

})();