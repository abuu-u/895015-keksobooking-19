'use strict';
(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var getRandom = function (number) {
    return Math.floor(Math.random() * number);
  };

  var getRandomElement = function (array) {
    return array[getRandom(array.length)];
  };

  var getRandomInRange = function (range) {
    return range.start + getRandom(range.end - range.start);
  };

  var generateNewArray = function (array) {
    var newArray = [];
    var arrayRandomLength = getRandom(array.length);

    for (var i = 0; i < array.length; i++) {
      newArray.push(array[i]);
    }

    for (var j = arrayRandomLength; j < array.length; j++) {
      newArray.splice(getRandom(newArray.length), 1);
    }

    return newArray;
  };

  var disableFieldsets = function (fieldsetsParent) {
    var fieldsets = fieldsetsParent.querySelectorAll('fieldset');

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'true');
    }
  };

  var enableFieldsets = function (fieldsetsParent) {
    var fieldsets = fieldsetsParent.querySelectorAll('fieldset');

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };

  var getPinCoordinates = function (pinElem) {
    var pinLeft = parseInt(pinElem.style.left, 10);
    var pinTop = parseInt(pinElem.style.top, 10);

    var coordinates = {
      left: pinLeft,
      top: pinTop
    };

    return coordinates;
  };

  window.utils = {
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    getRandom: getRandom,
    getRandomElement: getRandomElement,
    getRandomInRange: getRandomInRange,
    generateNewArray: generateNewArray,
    disableFieldsets: disableFieldsets,
    enableFieldsets: enableFieldsets,
    getPinCoordinates: getPinCoordinates
  };
})();
