'use strict';
(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var MAIN_PIN_START_COORDINATES = {
    TOP: '375px',
    LEFT: '570px'
  };

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

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
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

  var changeMinPrice = function () {
    ad.querySelector('#price').min = TYPE[ad.querySelector('#type').value];
    ad.querySelector('#price').placeholder = TYPE[ad.querySelector('#type').value];
  };

  var onTypeChange = function () {
    changeMinPrice();
  };

  var onTimeInChange = function () {
    ad.querySelector('#timeout').value = ad.querySelector('#timein').value;
  };

  var onTimeOutChange = function () {
    ad.querySelector('#timein').value = ad.querySelector('#timeout').value;
  };

  var resetPage = function () {
    var pins = map.querySelectorAll('.map__pin');
    var mapFilters = map.querySelector('.map__filters');

    map.querySelector('.map__card').remove();
    ad.reset();
    map.classList.add('map--faded');
    window.utils.disableFieldsets(mapFilters);
    mapFilters.classList.add('map__filters--disabled');
    window.utils.disableFieldsets(ad);
    ad.classList.add('ad-form--disabled');
    changeMinPrice();

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].matches('.map__pin--main')) {
        pins[i].remove();
      }
    }

    map.querySelector('.map__pin--main').style.top = MAIN_PIN_START_COORDINATES.TOP;
    map.querySelector('.map__pin--main').style.left = MAIN_PIN_START_COORDINATES.LEFT;

    fillAddress('center');
  };

  var removeSuccess = function () {
    document.querySelector('.success').remove();

    document.removeEventListener('click', onNotSuccessClick);
    document.removeEventListener('keydown', onSuccessPressEsc);
  };

  var onNotSuccessClick = function (evt) {
    if (evt.target !== document.querySelector('.success__message')) {
      removeSuccess();
    }
  };

  var onSuccessPressEsc = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      removeSuccess();
    }
  };

  var onFormSuccess = function () {
    var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    main.appendChild(successMessage);

    document.addEventListener('click', onNotSuccessClick);
    document.addEventListener('keydown', onSuccessPressEsc);

    resetPage();
  };

  var onFormResetClick = function () {
    resetPage();
  };

  var removeError = function () {
    document.querySelector('.error').remove();

    document.removeEventListener('click', onNotErrorClick);
    document.removeEventListener('keydown', onErrorPressEsc);
  };

  var onErrorRetryClick = function () {
    removeError();
  };

  var onNotErrorClick = function (evt) {
    if (evt.target !== document.querySelector('.error__message')) {
      removeError();
    }
  };

  var onErrorPressEsc = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      removeError();
    }
  };

  var onFormError = function () {
    var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);

    main.appendChild(errorMessage);

    document.querySelector('.error__button').addEventListener('click', onErrorRetryClick);
    document.addEventListener('click', onNotErrorClick);
    document.addEventListener('keydown', onErrorPressEsc);
  };

  window.utils.disableFieldsets(ad);

  fillAddress('center');
  ad.querySelector('#room_number').addEventListener('change', onCapacityChange);
  ad.querySelector('#capacity').addEventListener('change', onCapacityChange);
  ad.querySelector('#type').addEventListener('change', onTypeChange);
  ad.querySelector('#timein').addEventListener('change', onTimeInChange);
  ad.querySelector('#timeout').addEventListener('change', onTimeOutChange);

  ad.addEventListener('submit', function (evt) {
    window.upload(new FormData(ad), onFormSuccess, onFormError);
    evt.preventDefault();
  });

  ad.querySelector('.ad-form__reset').addEventListener('click', onFormResetClick);

  window.form = {
    ad: ad,
    validateCapacity: validateCapacity,
    fillAddress: fillAddress
  };
})();
