'use strict';
(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;

  var TYPE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var CAPACITY = {
    1: '1 комната — «для 1 гостя»',
    2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
    3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    100: '100 комнат — «не для гостей»'
  };

  var mainPin = document.querySelector('.map').querySelector('.map__pin--main');
  var ad = document.querySelector('.ad-form');

  var validateCapacity = function () {
    var roomNumber = ad.querySelector('#room_number').value;
    var guestsNumber = ad.querySelector('#capacity').value;

    if (roomNumber === '100' && guestsNumber !== '0') {
      ad.querySelector('#capacity').setCustomValidity(CAPACITY[roomNumber]);
    } else if (roomNumber >= guestsNumber && guestsNumber !== '0' || roomNumber === '100' && guestsNumber === '0') {
      ad.querySelector('#capacity').setCustomValidity('');
    } else {
      ad.querySelector('#capacity').setCustomValidity(CAPACITY[roomNumber]);
    }
  };

  var fillAddress = function (referencePoint) {
    var pinCoordinates = window.utils.getPinCoordinates(mainPin);
    var left = '';
    var top = '';

    if (referencePoint === 'center') {
      left = pinCoordinates.left + MAIN_PIN_WIDTH / 2;
      top = pinCoordinates.top + MAIN_PIN_WIDTH / 2;
    } else if (referencePoint === 'pointer') {
      left = pinCoordinates.left + MAIN_PIN_WIDTH / 2;
      top = pinCoordinates.top + MAIN_PIN_HEIGHT;
    }

    ad.querySelector('#address').value = left + ', ' + top;
  };

  var onCapacityChange = function () {
    validateCapacity();
  };

  var onTypeChange = function () {
    ad.querySelector('#price').min = TYPE[ad.querySelector('#type').value];
    ad.querySelector('#price').placeholder = TYPE[ad.querySelector('#type').value];
  };

  var onTimeInChange = function () {
    ad.querySelector('#timeout').value = ad.querySelector('#timein').value;
  };

  var onTimeOutChange = function () {
    ad.querySelector('#timein').value = ad.querySelector('#timeout').value;
  };

  window.utils.disableFieldsets(ad);

  fillAddress('center');
  ad.querySelector('#room_number').addEventListener('change', onCapacityChange);
  ad.querySelector('#capacity').addEventListener('change', onCapacityChange);
  ad.querySelector('#type').addEventListener('change', onTypeChange);
  ad.querySelector('#timein').addEventListener('change', onTimeInChange);
  ad.querySelector('#timeout').addEventListener('change', onTimeOutChange);

  window.form = {
    ad: ad,
    validateCapacity: validateCapacity,
    fillAddress: fillAddress
  };
})();
