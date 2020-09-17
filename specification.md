﻿# Техническое задание на Кодымагию

Кодымагия — онлайн-платформер про волшебника Пендальфа Синего, с личным кабинетом, в котором пользователь может настроить своего персонажа — указать имя, закинуть вещи в рюкзак, а также сравнить своего персонажа с персонажами других пользователей.

В Демо-версии игры доступен всего один уровень. Управление маго осуществяется стрелками. Стрельба — клавиша `Shift`. Игрок побеждает, если попадает файрболлом в забор.

## Описание функциональности
### Сценарий поведения пользователя на сайте:
- демо-версия игры «Кодымагия»
- личный кабинет пользователя
  - изменение имени и аватарки игрока
  - блок доступного для покупки инвентаря
  - блок настройки персонажа: цвет плаща и глаз персонажа, а также содержимое его рюкзака
  - сравнение с персонажами друзей

Заполнение всей информации производится на одной странице без промежуточных переходов. Порядок заполнения информации не важен.

Реализация загрузки аватара необязательна.

### Блок настройки внешнего вида персонажа
Настраиваемые параметры:
- имя игрока
  - обязательное поле
  - максимальный размер 25 символов
- аватар игрока
  - графический файл
- цвет глаз
  - обязательное поле
- цвет плаща
  - обязательное поле
- цвет файрболов
  - обязательное поле

Настройка соответсвующего параметра прозводится непосредственным кликом или нажатием с клавиатуры на соответсвующий элемент персонажа.

Каждый из этих параметров никак не влияет на поведение персонажа, только на его внешний вид.

## Блок инвентаря и магазина
В блоке магазина (горизонтальный блок) лежат доступные для мага вещи: звезды, дополнительные файрболлы...

При перетаскивании из блока магазина в блок инвентаря предмет копируется.

### Сравнение с персонажами друзей
Похожие персонажи друзей показываются после того, как пользователь изменил один из параметров персонажа. Например, если пользователь поменял цвет глаз на зеленый, то ему показываются сначала персонажи с зелеными глазами, а затем все прочие. На странице показывается максимум 4 персонажа.