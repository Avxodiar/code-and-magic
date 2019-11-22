'use strict';

(function() {

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

var inputFile = document.querySelector('.upload input[type=file]');
var avatar = document.querySelector('.setup-user-pic');

inputFile.addEventListener('change', function() {
  if(!inputFile.files[0]) {
    window.wizard.say('Не выбран файл или выбран тот же самый!');
    return false;
  }
  var file = inputFile.files[0];

  var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
   return fileName.endsWith(it);
  });

  if (matches) {
    var fr = new FileReader();
    fr.addEventListener('load', function() {
      avatar.src = fr.result;
    });
    fr.readAsDataURL(file);
  } else {
    window.wizard.say('Не поддерживаемый формат изображения!');
  }

});

})();