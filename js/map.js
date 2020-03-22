'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var PINS_COUNT = 5;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;

  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  var filtersContainer = map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelector('.map__filters');

  var pinsData;
  var onPinClicks = [];

  var mapFilters = [
    'type',
    'rooms',
    'guests'
  ];

  var HousePrice = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000
    }
  };

  var house = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var activatePage = function () {
    if (filters.querySelector('fieldset').disabled) {
      map.classList.remove('map--faded');

      window.form.ad.classList.remove('ad-form--disabled');
      window.utils.enableFieldsets(window.form.ad);

      window.form.fillAddress('pointer');

      window.form.validateCapacity();
      window.load(onLoadSuccess);
    }
  };

  var onCardPressClose = function (evt) {
    if (evt.target && evt.target.parentNode.matches('.map__card') && evt.target.matches('.popup__close')) {
      map.querySelector('.map__card').remove();
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');

      map.removeEventListener('click', onCardPressClose);
      window.removeEventListener('keydown', onCardPressEsc);
    }
  };

  var onCardPressEsc = function (evt) {
    if (evt.key === window.utils.ESC_KEY && map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');

      map.removeEventListener('click', onCardPressClose);
      window.removeEventListener('keydown', onCardPressEsc);
    }
  };

  var renderCard = function (evt) {
    var pin = evt.target;
    if (map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    if (!map.querySelector('.map__card')) {
      map.insertBefore(window.card.render(pinsData[pin.getAttribute('data-id')]), filtersContainer);
      pin.classList.add('map__pin--active');

      map.addEventListener('click', onCardPressClose);
      window.addEventListener('keydown', onCardPressEsc);
    }
  };

  var renderPins = function (pins, pinsCount) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer && i < pinsCount) {
        var pin = window.pin.render(pins[i], PIN_WIDTH / 2, PIN_HEIGHT);
        pin.setAttribute('data-id', i);
        fragment.appendChild(pin);
        pin.addEventListener('click', renderCard);
      }
    }
    pinsContainer.appendChild(fragment);
  };

  var removePins = function () {
    var pins = map.querySelectorAll('[type=button].map__pin');

    pins.forEach(function (pin) {
      if (!pin.matches('.map__pin--main')) {
        pin.removeEventListener('click', renderCard);
        pin.remove();
      }
    });
  };

  var onMainPinLeftMousedown = function (evt) {
    if (evt.button === window.utils.LEFT_MOUSE_BUTTON) {
      activatePage();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var top = mainPin.offsetTop - shift.y + MAIN_PIN_HEIGHT;
        var left = mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2;

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (top >= MIN_Y && top <= MAX_Y) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }

        if (left >= MIN_X && left <= pinsContainer.offsetWidth) {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }

        window.form.fillAddress('pointer');
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      activatePage();
    }
  };

  var updatePins = window.debounce(function () {
    if (map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
    }

    removePins();
    renderPins(filterPins(pinsData), PINS_COUNT);
  });

  var onTypeChange = function (evt) {
    house.type = evt.target.value;
    updatePins();
  };

  var onPriceChange = function (evt) {
    house.price = evt.target.value;
    updatePins();
  };

  var onRoomsChange = function (evt) {
    house.rooms = evt.target.value;
    updatePins();
  };

  var onGuestsChange = function (evt) {
    house.guests = evt.target.value;
    updatePins();
  };

  var onFeaturesChange = function (evt) {
    if (evt.target.checked) {
      house.features.push(evt.target.value);
    } else {
      house.features.splice(evt.target, 1);
    }

    updatePins();
  };

  var filterPins = function (data) {
    return data.filter(function (pin) {
      var match = true;

      mapFilters.forEach(function (filter) {
        if (pin.offer[filter].toString() !== house[filter] && house[filter] !== 'any') {
          match = false;
        }
      });

      if (house.price !== 'any') {
        if (HousePrice[house.price].min > pin.offer.price || HousePrice[house.price].max < pin.offer.price) {
          match = false;
        }
      }

      if (house.features.length) {
        var matchCount = 0;

        house.features.forEach(function (feature) {
          if (pin.offer.features.indexOf(feature) !== -1) {
            matchCount++;
          }
        });

        if (matchCount !== house.features.length) {
          match = false;
        }
      }

      return match;
    });
  };

  var onLoadSuccess = function (data) {
    pinsData = data;
    renderPins(pinsData, PINS_COUNT);

    filters.classList.remove('map__filters--disabled');
    window.utils.enableFieldsets(filters);
    filters.querySelector('#housing-type').addEventListener('change', onTypeChange);
    filters.querySelector('#housing-price').addEventListener('change', onPriceChange);
    filters.querySelector('#housing-rooms').addEventListener('change', onRoomsChange);
    filters.querySelector('#housing-guests').addEventListener('change', onGuestsChange);
    filters.querySelector('#housing-features').addEventListener('change', onFeaturesChange);
  };

  window.utils.disableFieldsets(filters);

  mainPin.addEventListener('mousedown', onMainPinLeftMousedown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.map = {
    onPinClicks: onPinClicks,
    removePins: removePins
  };
})();
