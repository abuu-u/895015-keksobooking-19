'use strict';
(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var STATUS_CODE = {
    OK: 200
  };

  var disableFieldsets = function (fieldsetsParent) {
    var fieldsets = fieldsetsParent.querySelectorAll('fieldset');

    fieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'true');
    });
  };

  var enableFieldsets = function (fieldsetsParent) {
    var fieldsets = fieldsetsParent.querySelectorAll('fieldset');

    fieldsets.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });
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
    STATUS_CODE: STATUS_CODE,
    disableFieldsets: disableFieldsets,
    enableFieldsets: enableFieldsets,
    getPinCoordinates: getPinCoordinates
  };
})();
