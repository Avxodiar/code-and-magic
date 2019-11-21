'use strict';

(function() {

window.wizards = {
  userParams: {
    colorFireball: '#ee4830',
    colorEyes: 'black',
    colorCoat: 'rgb(101, 137, 164)'
  },
  // соответсвие параметров персонажей с именами input формы для хранения данных
  inputMap: {
    'colorCoat': "coat-color",
    'colorEyes': "eyes-color",
    'colorFireball': "fireball-color"
  },
  changeColor(evt) {
    var wizardProp = '';
    var targetClass = evt.target.classList;
    if( targetClass.contains("wizard-coat") ) {
      wizardProp = "colorCoat";
    } else if( targetClass.contains("wizard-eyes") ) {
      wizardProp = "colorEyes";
    } else if( targetClass.contains("setup-fireball") ) {
      wizardProp = "colorFireball";
    }

    if( window.wizardsSimilar.getPersonParam(wizardProp) ) {
      this.changePropColor(evt, wizardProp);
    }
  },
  //изменение цвета у элемента с указанным классом
  changePropColor: function (evt, wizardProp) {
    var colorId = (evt.target.dataset.colorId == undefined ) ? 0 : evt.target.dataset.colorId;

    var wizardParams = window.wizardsSimilar.getPersonParam(wizardProp);
    if(wizardParams == undefined ) return false;

    colorId++;
    colorId = ( colorId < wizardParams.length ) ? colorId : 0 ;
    evt.target.dataset.colorId = colorId;
    if (wizardProp == "colorFireball") {
      evt.target.parentNode.style.background = wizardParams[colorId];
    } else {
      evt.target.style.fill = wizardParams[colorId];
    }

    //применяем изменения
    var inputName = this.inputMap[wizardProp];
    document.querySelector('input[name="'+ inputName +'"]').value = wizardParams[colorId];

    //сохраняем текущие параметры пользователя
    this.userParams[wizardProp] = wizardParams[colorId];

    // обновляем список похожих
    window.debounce( window.wizardsSimilar.update );
  }
}


})();