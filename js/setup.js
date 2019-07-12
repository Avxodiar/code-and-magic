'use strict';

// шаблон для генерации параметров персонажей
var persons = {
  name:   ['Дворкин', 'Мелькор', 'Гэндальф',        'Саруман',      'Зеддикус',      'Ричард', 'Кэлен',  'Кара',   'Рейстлин', 'Рам',   'Гассан',     'Джонатан',  'Борис',  'Артур',   'Волан',   'Альбус',   'Гарри'],
  family: ['Баримен', 'Ба́углир', 'Митрандир Серый', 'Курумо Белый', 'З’ул Зорандер', 'Рал',    'Амнелл', 'Мейсон', 'Маджере',  'Аббал', 'ибн Хоттаб', 'Стрэндж',   'Гессер', 'Завулон', 'де-Морт', 'Дамблдор', 'Поттер' ],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  yeysColor: ['black', 'brown', 'red', 'blue', 'yellow', 'green'],
  fireballColor: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};
var KEY_ENTER = 13;
var KEY_ESC = 27;

// кнопка Настройки
var buttonSetup = document.querySelector('.setup-open');

// форма Настройки
var setupForm = document.querySelector('.setup-wizard-form');

//блок Настройки
var setup = document.querySelector('.setup');
var setupUserName = document.querySelector('.setup-user-name');
var buttonCloseSetup = setup.querySelector('.setup-close');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setup.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector("#similar-wizard-template").content;

var setupWizard = setup.querySelector('.setup-wizard');
var setupFireball = setup.querySelector('.setup-fireball-wrap');

var VALIDY_STATE = {
  valueMissing: 'Не заполнено обязательное поле',
  tooShort: 'Имя должно состоять минимум из 2-х символов',
  tooLong: 'Имя не должно превышать 25-ти символов',
  badInput: 'Введено неправильное значение',
}

createWizardList();

buttonSetup.addEventListener('click', evtShowSetup );
buttonSetup.addEventListener('keydown', evtShowSetupEnterPress );


setupUserName.addEventListener('invalid', function(evt) {
  var mess = getValidState( evt );
  if( mess ) {
    evt.target.setCustomValidity( mess );
  }
} );

setupUserName.addEventListener('input', function(evt) {
  var mess  = (evt.target.value.length < 2 ) ? VALIDY_STATE.tooShort : '';
  evt.target.setCustomValidity( mess );
});

function getValidState(evt) {
  var validiState = evt.target.validity;
  for( var state in VALIDY_STATE ) {
    if ( validiState[state] ) {
      return VALIDY_STATE[state];
    }
  }
  return false;
}


/**
 * Показ окна Настройки
 */
function evtShowSetup() {
  setup.classList.remove('hidden');
  setupUserName.focus();
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
  setupWizard.removeEventListener('click', evtWizardCoatClickColorChange );
}
/* Показ по нажатию ENTER */
function evtShowSetupEnterPress(evt) {
  if(evt.keyCode === KEY_ENTER) {
    evt.stopPropagation();
    evtShowSetup();
  }
}
/* Закрытие по нажатию ESC */
function evtCloseSetupEscPress(evt) {
  if( (evt.keyCode === KEY_ESC  || evt.keyCode === KEY_ENTER )  && evt.target != setupUserName ) {
    evtCloseSetup();
  }
}
/* Закрытие по нажатию Enter на кнопке закрыть */
function evtCloseSetupEnterPress(evt) {
  if(evt.keyCode === KEY_ENTER) {
    evtCloseSetup();
  }
}

/* отправка формы по нажатию Enter на кнопке отправить*/
function evtFormSubmitEnterPress(evt) {
  if(evt.keyCode === KEY_ENTER) {
    if ( evt.target == setupUserName ) {
      event.preventDefault();
    }
    else  alert('submit');
  }
}

function evtWizardColorChange(evt) {
  var wizardProp = '';
  var targetClass = evt.target.classList;
  if( targetClass.contains("wizard-coat") ) {
    wizardProp = "coatColor";
  } else if( targetClass.contains("wizard-eyes") ) {
    wizardProp = "yeysColor";
  } else if( targetClass.contains("setup-fireball") ) {
    wizardProp = "fireballColor";
  }
  if( persons[wizardProp] ) {
    changeWizardPropColor(evt, wizardProp);
  }
}

function changeWizardPropColor(evt, wizardProp) {
  var colorId = (evt.target.dataset.colorId == undefined ) ? 0 : evt.target.dataset.colorId;
  colorId++;
  colorId = ( colorId < persons[wizardProp].length ) ? colorId : 0 ;
  evt.target.dataset.colorId = colorId;
  if (wizardProp == "fireballColor") {
    evt.target.parentNode.style.background = persons[wizardProp][colorId];
  } else {
    evt.target.style.fill = persons[wizardProp][colorId];
  }
  var hiddenInputName;
  switch(wizardProp) {
    case 'coatColor':
      hiddenInputName = "coat-color";
      break;
    case 'yeysColor':
      hiddenInputName = "eyes-color";
      break;
    case 'fireballColor':
      hiddenInputName = "fireball-color";
      break;
  }
  if(hiddenInputName) {
    document.querySelector('input[name="'+hiddenInputName+'"]').value = persons[wizardProp][colorId];
  }

}

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