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

  var mainPin = document.querySelector('.map').querySelector('.map__pin--main');
  var ad = document.querySelector('.ad-form');

  var validateCapacity = function () {
    var roomNumber = ad.querySelector('#room_number').value;
    var guestsNumber = ad.querySelector('#capacity').value;

    if (roomNumber === '100' && guestsNumber !== '0') {
      ad.querySelector('#capacity').setCustomValidity('100 комнат — «не для гостей»');
    } else if (roomNumber >= guestsNumber && guestsNumber !== '0' || roomNumber === '100' && guestsNumber === '0') {
      ad.querySelector('#capacity').setCustomValidity('');
    } else {
      if (roomNumber === '1') {
        ad.querySelector('#capacity').setCustomValidity('1 комната — «для 1 гостя»');
      } else if (roomNumber === '2') {
        ad.querySelector('#capacity').setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
      } else if (roomNumber === '3') {
        ad.querySelector('#capacity').setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
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
