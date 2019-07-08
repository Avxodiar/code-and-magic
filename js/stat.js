'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLOR_CLOUD_SHADOW = 'rgba(0, 0, 0, 0.3)';

var GAP = 10;
var FONT_GAP = 20;
var TEXT_MARGIN = 5;
var COLOR_TEXT = '#000';
var COLOR_USER_BAR = 'rgba(255, 0, 0, 1)';

var STATBAR_TOP_MARGIN = 100;
var STATBAR_SIDE_MARGIN = 50;
var STATBAR_WIDTH = 40;
var STATBAR_MAX_LENGHT = 150;

/**
 * Отрисовка облака
 * @param  object ctx  - контекст отрисовки CanvasRenderingContext2D 
 * @param  int x - начальная позиция коорд. X
 * @param  int y - начальная позиция коорд. Y
 * @param  string color - цвет заливки
  */
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

/**
 * Отрисовка статистики
 * @param object ctx  - контекст отрисовки CanvasRenderingContext2D 
 * @param array players - список игроков
 * @param array times - результаты игроков
 */
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLOR_CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  // Поздравление
  ctx.font = "16px PT Mono";
  ctx.fillStyle = COLOR_TEXT;
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, FONT_GAP * 2 );
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, FONT_GAP * 3 );
  
  //Определение макс.значения времени прохождения игры пользователями
  var maxTime = 0;
  for (var i = 0; i< times.length; i++) {
    times[i] = parseInt(times[i]);
    if( times[i] > maxTime) maxTime = times[i];
  }
  
  //координаты гистограммы
  var barPosX = CLOUD_X + FONT_GAP * 2;
  var barPosY = CLOUD_Y + STATBAR_TOP_MARGIN + STATBAR_MAX_LENGHT + TEXT_MARGIN;

  //гистограммы пользователей
  for (var i = 0; i< players.length; i++) {
    // высота столбца гистограммы
    var userProgress = parseInt(STATBAR_MAX_LENGHT / maxTime * times[i]);

    //время прохождения
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(times[i],   barPosX, barPosY - FONT_GAP - userProgress - TEXT_MARGIN );

    //столбец гистограммы случайного синего цвета, начинается с 55 - чтобы не казаться близким к черному
    ctx.fillStyle = (players[i] == 'Вы') ? COLOR_USER_BAR : 'rgba(0,0,'+ Math.ceil(55 + Math.random()*200) + ')';
    ctx.fillRect(barPosX, barPosY - FONT_GAP - userProgress , STATBAR_WIDTH, userProgress);

    //имя пользователя
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(players[i], barPosX, barPosY);
    
    //смещение координат для следующего пользователя
    barPosX += STATBAR_SIDE_MARGIN + STATBAR_WIDTH;
  }
  
}