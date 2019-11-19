'use strict';

(function() {

// шаблон для генерации параметров персонажей
var persons = {
  name:   ['Дворкин', 'Мелькор', 'Гэндальф',        'Саруман',      'Зеддикус',      'Ричард', 'Кэлен',  'Кара',   'Рейстлин', 'Рам',   'Гассан',     'Джонатан',  'Борис',  'Артур',   'Волан',   'Альбус',   'Гарри', 'Дэвид', 'Антон', 'Алистер'],
  family: ['Баримен', 'Ба́углир', 'Митрандир Серый', 'Курумо Белый', 'З’ул Зорандер', 'Рал',    'Амнелл', 'Мейсон', 'Маджере',  'Аббал', 'ибн Хоттаб', 'Стрэндж',   'Гессер', 'Завулон', 'де-Морт', 'Дамблдор', 'Поттер', 'Блэйн', 'Гудини', 'Городецкий', 'Кроули', 'Крестная Фея', 'Ведьма Пустоши'],
  colorCoat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  colorEyes: ['black', 'brown', 'red', 'blue', 'yellow', 'green'],
  colorFireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

window.wizards = {
  getPersons: function() {
    return persons;
  },
  getPersonParam: function(param) {
    return (persons[param]) ? persons[param] : undefined;
  }
}


})();