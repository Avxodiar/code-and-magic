'use strict';

// шаблон для генерации параметров персонажей
var persons = {
  name:   ['Дворкин', 'Мелькор', 'Гэндальф',        'Саруман',      'Зеддикус',      'Ричард', 'Кэлен',  'Кара',   'Рейстлин', 'Рам',   'Гассан',     'Джонатан',  'Борис',  'Артур',   'Волан',   'Альбус',   'Гарри'],
  family: ['Баримен', 'Ба́углир', 'Митрандир Серый', 'Курумо Белый', 'З’ул Зорандер', 'Рал',    'Амнелл', 'Мейсон', 'Маджере',  'Аббал', 'ибн Хоттаб', 'Стрэндж',   'Гессер', 'Завулон', 'де-Морт', 'Дамблдор', 'Поттер' ],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  yeysColor: ['black', 'brown', 'red', 'blue', 'yellow', 'green']
};


var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setup.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector("#similar-wizard-template").content;

createWizardList();
//временное отображение окна настроек
setup.classList.remove('hidden');

/**
 * Создание списка похожих персонажей
 * @param  int count - количество
 */
function createWizardList(count) {
  count = Math.abs(parseInt(count)) | 4;
  for(var i = 0; i < count; i++) {
    var person = generatePerson(false);
    setupSimilarList.appendChild( cloneWizard(person) );
  }
  setupSimilar.classList.remove('hidden');
}

/**
 * Генерирация характеристик/описания персонажа
 * @param  boolean repeat - использовать ли повторно имена.
 * Важно! При repeat == true, кол-во персонажей ограничено размером persons.name и persons.family
 * @return object 
 */
function generatePerson(repeat) {
  repeat  = !!repeat;
  var person = {};
  for (var prop in persons) {
    var randomId = Math.floor( Math.random() * persons[prop].length );
    var randomVal =
          (!repeat && (prop == 'name' || prop == 'family')) ? persons[prop].splice(randomId,1) : [ persons[prop][randomId] ];
    person[prop] = randomVal[0];
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