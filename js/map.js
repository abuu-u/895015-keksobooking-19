'use strict';
(function () {
  var PINS_COUNT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  var filtersContainer = map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelector('.map__filters');

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.render(pins[i], PIN_WIDTH / 2, PIN_HEIGHT));
    }
    pinsContainer.appendChild(fragment);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');

    window.form.ad.classList.remove('ad-form--disabled');
    window.utils.enableFieldsets(window.form.ad);

    filters.classList.remove('map__filters--disabled');
    window.utils.enableFieldsets(filters);

    mainPin.removeEventListener('mousedown', onMainPinLeftMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.form.fillAddress('pointer');

    window.form.validateCapacity();
  };

  var onMainPinMousemove = function () {
    window.form.fillAddress('pointer');
  };

  var onMainPinLeftMousedown = function (evt) {
    if (evt.button === window.utils.LEFT_MOUSE_BUTTON) {
      activatePage();
      mainPin.addEventListener('mousemove', onMainPinMousemove);
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      activatePage();
    }
  };

  var onCardPressClose = function (evt) {
    if (evt.target && evt.target.parentNode.matches('.map__card') && evt.target.matches('.popup__close')) {
      map.querySelector('.map__card').remove();
    }
  };

  var onCardPressEsc = function (evt) {
    if (evt.key === window.utils.ESC_KEY && map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
    }
  };

  var renderCard = function (pins) {
    var skip = 0;

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].matches('.map__pin--main')) {
        skip++;
      } else {
        (function (pin, card) {
          pin.addEventListener('click', function () {
            if (map.querySelector('.map__card')) {
              map.querySelector('.map__card').remove();
            }

            if (!map.querySelector('.map__card')) {
              map.insertBefore(card, filtersContainer);
            }
          });
        })(pins[i], window.card.render(pinsData[i - skip]));
      }
    }
  };

  var pinsData = window.pin.generate(window.DATA, PINS_COUNT);
  renderPins(pinsData);

  window.utils.disableFieldsets(filters);

  mainPin.addEventListener('mousedown', onMainPinLeftMousedown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

  var pins = pinsContainer.querySelectorAll('.map__pin');
  renderCard(pins);

  map.addEventListener('click', onCardPressClose);

  window.addEventListener('keydown', onCardPressEsc);
})();