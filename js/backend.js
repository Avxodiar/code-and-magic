'use strict';

(function() {

  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';

  /**
   * Проверка статуса запроса
   * @param  int    status     - код статуса
   * @param  string statusText - текст статуса
   * @return string error      - ошибка (при наличии)
   */
  function checkStatus(status, statusText) {
    var error;
    switch(status) {
      case 200:
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Статус ответа: ' + status + ' ' + statusText;
        break;
    }
    return error;
  }

  /**
  * Обертка XMLHttpRequest
  */
  function XHRequest(method, url, respType, date, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = respType;

    xhr.addEventListener('load', function() {
      var error = checkStatus(xhr.status, xhr.statusText);
      if(!error) {
        onLoad(xhr.response);
      } else {
        onError(error);
      }
    });
    xhr.addEventListener('error', function() {
      onError('Ошибка соединения с сервером');
    });
    xhr.addEventListener('timeout', function() {
      onError('Превышено время ожидания ответа: '+ xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(date);
  }

  window.backend = {
    load: function(onLoad, onError) {
      XHRequest('GET', LOAD_URL, 'json', '', onLoad, onError);
    },
    save: function(date, onLoad, onError) {
      XHRequest('POST', SAVE_URL, 'json', date, onLoad, onError);
    }
  }

})();