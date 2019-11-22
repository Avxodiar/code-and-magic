'use strict';

(function() {

//блок Настройки
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
var setupSimilarItems = setupSimilarList.querySelectorAll('.setup-similar-item');

var wizardTemplate = document.querySelector("#similar-wizard-template").content;
var setupError = document.querySelector("#setup-error");


function showError(errorMessage) {
  setupError.innerText = errorMessage;
  setupError.classList.remove('hidden');
  setTimeout(hideError, 10000);
}
function hideError() {
  setupError.classList.add('hidden');
  setupError.removeEventListener('click', hideError);
}
setupError.addEventListener('click', hideError);


// Список загруженных волшебников
var loadedWizards = {};

// загрузка персонажей с сервера или генерация похожих персонажей для окна настроек
window.backend.load(
  function(wizards) {
    console.info('Загружены персонажи для демонстрации');
    showError('Загружены персонажи для демонстрации');
    console.warn('Но кому это интересно? Генерируем новые имена');
    renameWizards(wizards);
    // сохраняем загруженный список волшебников
    loadedWizards = wizards;
    // сортируем по схожести
    sortByRait();
    createSimilarWizards();
  },
  function(errorMessage) {
    showError('Ошибка загрузки персонажей с сервера: '+ errorMessage);
    createSimilarWizards();
    console.warn('Сгенерированы похожие персонажи для демонстрации');
  }
);

// количество отображаемых похожих волшебников
var COUNT_SIMILAR = 4;

// шаблон для генерации параметров персонажей
var persons = {
  name:   ['Дворкин', 'Мелькор', 'Гэндальф',        'Саруман',      'Зеддикус',      'Ричард', 'Кэлен',  'Кара',   'Рейстлин', 'Рам',   'Гассан',     'Джонатан',  'Борис',  'Артур',   'Волан',   'Альбус',   'Гарри', 'Дэвид', 'Антон', 'Алистер'],
  family: ['Баримен', 'Ба́углир', 'Митрандир Серый', 'Курумо Белый', 'З’ул Зорандер', 'Рал',    'Амнелл', 'Мейсон', 'Маджере',  'Аббал', 'ибн Хоттаб', 'Стрэндж',   'Гессер', 'Завулон', 'де-Морт', 'Дамблдор', 'Поттер', 'Блэйн', 'Гудини', 'Городецкий', 'Кроули', 'Крестная Фея', 'Ведьма Пустоши'],
  colorCoat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  colorEyes: ['black', 'brown', 'red', 'blue', 'yellow', 'green'],
  colorFireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

window.wizardsSimilar = {
  getPersonParam: function(param) {
    return (persons[param]) ? persons[param] : undefined;
  },
  // изменение списка похожих волшебников при изменении цвета нашего волшебника
  update: function() {
    sortByRait();
    updateSimilarList();
  }
}

/**
 * Проверка списка волшебников
 * @return {[type]} [description]
 */
function checkWizards() {
  if(typeof loadedWizards != 'object') {
    loadedWizards = [];
  }
  while(loadedWizards.length < COUNT_SIMILAR) {
    loadedWizards.push( generatePerson() );
  }
}

/**
 * Загрузка или создание списка похожих персонажей
 * @param  object arWizard - загруженные/сгенерированные персонажи
 * @param  int    count    - количество
 */
function createSimilarWizards() {
  checkWizards();
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < COUNT_SIMILAR; i++) {
      fragment.appendChild( cloneWizard(loadedWizards[i]) );
  };
  setupSimilarList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
}

/**
 * Переименование персонажей в загруженном списке
 * @param  object arWizard - загруженные/сгенерированные персонажи
 */
function renameWizards(wizards) {
  var names = persons['name'];
  var families = persons['family'];
  var randomId;
  for (var i in wizards ) {
    randomId = Math.floor( Math.random() * names.length );
    wizards[i]['name'] = names[randomId];
    randomId = Math.floor( Math.random() * families.length );
    wizards[i]['family'] = families[randomId];
  }
}

/**
 * Генерирация характеристик/описания персонажа
 * @return object
 */
function generatePerson() {
  var person = {};
  for (var prop in persons ) {
    var randomId = Math.floor( Math.random() * persons[prop].length );
    person[prop] = persons[prop][randomId];
  }
  return person;
}

/**
 * Задание объекту волшебника его параметров
 * @param  object elem   - изменяемый объект волшебника
 * @param  object person - параметры волшебника
 */
function updateElem(elem, person) {
  if (typeof elem != 'object' || typeof person != 'object' ) return false;

  var name = person.name;
  if (person.family) {
    name += ' ' + person.family;
  }
  elem.querySelector('.setup-similar-label').textContent = name;
  elem.querySelector('.wizard-coat').style.fill = person.colorCoat;
  elem.querySelector('.wizard-eyes').style.fill = person.colorEyes;
}

/**
 * Клонирование шаблона волшебника по переданному описанию
 * @param  object clone - объект с описанием волшебника
 * @return document fragment
 */
function cloneWizard(person) {
  var wizardClone = wizardTemplate.cloneNode(true);
  updateElem(wizardClone, person);

  return wizardClone;
}

/**
 * подсчет рейтинга волшебника
 * за такой же плащ даем 3 балла, глаза - 2 балла, посох - 1
*/
function getWizardRaiting(wizard) {
  var rait = 0;
  var pattern = window.wizard.userParams;
  for(var key in pattern) {
    if (wizard[key] == pattern[key]) {
      switch(key) {
        case 'colorCoat':
          rait += 4;  break;
        case 'colorEyes':
          rait += 2;  break;
        default:
          rait++;
      }
    }
  }
  return rait;
}

/**
 * Сортировка по имени
 * @return int
 */
function compareNames(leftName, rightName) {
  if (leftName > rightName) {
    return 1;
  } else if (leftName < rightName) {
    return -1;
  }
  return 0;
};

/**
 * Сортировка списка загруженных волшебников по схожести с персонажем пользователя
 */
function sortByRait() {
  loadedWizards.sort(function(left,right) {
    var raitingDiff = getWizardRaiting(right) - getWizardRaiting(left);
    if(raitingDiff === 0) {
      return compareNames(left.name, right.name);
    }
    return raitingDiff;
  });
}

/**
 * Обновление похожих волшебников после сортировки sortByRait
 */
function updateSimilarList() {
  var setupSimilarItems = setupSimilarList.querySelectorAll('.setup-similar-item');
  for (var i = 0; i < setupSimilarItems.length; i++) {
    updateElem(setupSimilarItems[i], loadedWizards[i]);
  }
}

})();