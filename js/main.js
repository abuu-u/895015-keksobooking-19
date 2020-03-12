// Файл setup.js
'use strict';

var LEFT_BUTTON = 0;
var ENTER_KEY = 'Enter';

var DATA = {
  avatar: {
    path: 'img/avatars/user',
    format: '.png'
  },

  title: 'title',
  address: '600, 350',
  price: 123,
  type: ['palace', 'flat', 'house', 'bungalo'],
  rooms: 123,
  guests: 123,
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: 'description',
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  locationY: {
    start: 130,
    end: 630
  }
};

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 82;

// var TYPE = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };

var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// var card = document.querySelector('#card')
//     .content
//     .querySelector('.map__card');

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var filtersContainer = map.querySelector('.map__filters-container');
var filtersForm = filtersContainer.querySelector('.map__filters');

var adForm = document.querySelector('.ad-form');

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

var generateAvatar = function (path, i, format) {
  if (!path || !format) {
    return '';
  }

  return path + '0' + (i + 1) + format;
};

var generateLocation = function (location) {
  var obj = {
    x: getRandom(mapPins.offsetWidth),
    y: getRandomInRange(location)
  };

  return obj;
};

var generatePins = function (data, pinsCount) {
  var pins = [];

  for (var i = 0; i < pinsCount; i++) {
    pins.push({
      author: {
        avatar: generateAvatar(data.avatar.path, i, data.avatar.format)
      },

      offer: {
        title: data.title,
        address: data.address,
        price: data.price,
        type: getRandomElement(data.type),
        rooms: data.rooms,
        guests: data.guests,
        checkin: getRandomElement(data.checkin),
        checkout: getRandomElement(data.checkout),
        features: generateNewArray(data.features),
        description: data.description,
        photos: generateNewArray(data.photos)
      },

      location: generateLocation(data.locationY)
    });
  }

  return pins;
};

var renderPin = function (pinElementTemplate, offsetX, offsetY) {
  var pinElement = pin.cloneNode(true);
  var pinX = pinElementTemplate.location.x - offsetX;
  var pinY = pinElementTemplate.location.y - offsetY;

  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('img').src = pinElementTemplate.author.avatar;
  pinElement.querySelector('img').alt = pinElementTemplate.title;

  return pinElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i], PIN_WIDTH / 2, PIN_HEIGHT));
  }
  mapPins.appendChild(fragment);
};

// var renderTextElement = function (element, text) {
//   if (!text) {
//     element.remove();
//     return;
//   }

//   element.textContent = text;
// };

// var renderPrice = function (priceElement, price) {
//   if (!price) {
//     priceElement.remove();
//     return;
//   }

//   var priceText = price + '₽/ночь';
//   priceElement.textContent = priceText;
// };

// var renderType = function (typeElement, type) {
//   if (!type) {
//     typeElement.remove();
//     return;
//   }

//   var typeText = TYPE[type];
//   typeElement.textContent = typeText;
// };

// var renderCapacity = function (capacityElement, rooms, guests) {
//   if (!rooms || !guests) {
//     capacityElement.remove();
//     return;
//   }

//   var capacity = rooms + ' комнаты для ' + guests + ' гостей';
//   capacityElement.textContent = capacity;
// };

// var renderTime = function (timeElement, checkin, checkout) {
//   if (!checkin || !checkout) {
//     timeElement.remove();
//     return;
//   }

//   var time = 'Заезд после ' + checkin + ', выезд до ' + checkout;
//   timeElement.textContent = time;
// };

// var renderFeatures = function (featuresList, featuresNames) {
//   if (!featuresNames.length) {
//     featuresList.remove();
//     return;
//   }

//   var featuresElements = featuresList.querySelectorAll('li');
//   var removeCount = 0;

//   for (var i = 0; i < featuresElements.length; i++) {
//     featuresElements[i].textContent = DATA.features[i];

//     for (var j = i + removeCount; featuresNames[i] !== DATA.features[j]; j++) {
//       featuresElements[j].remove();
//       removeCount++;
//     }
//   }
// };

// var renderPhotos = function (photosList, photoLinks) {
//   if (!photoLinks.length) {
//     photosList.remove();
//     return;
//   }

//   var photoElementTemplate = photosList.querySelector('img');
//   photoElementTemplate.remove();

//   for (var i = 0; i < photoLinks.length; i++) {
//     var photoElement = photoElementTemplate.cloneNode(true);
//     photoElement.src = photoLinks[i];
//     photosList.appendChild(photoElement);
//   }
// };

// var renderAvatar = function (avatar, src) {
//   if (!src) {
//     avatar.remove();
//     return;
//   }

//   avatar.src = src;
// };

// var renderCard = function (cardElementTemplate) {
//   var cardElement = card.cloneNode(true);
//   var offer = cardElementTemplate.offer;

//   renderTextElement(cardElement.querySelector('.popup__title'), offer.title);
//   renderTextElement(cardElement.querySelector('.popup__text--address'), offer.address);
//   renderPrice(cardElement.querySelector('.popup__text--price'), offer.price);
//   renderType(cardElement.querySelector('.popup__type'), offer.type);
//   renderCapacity(cardElement.querySelector('.popup__text--capacity'), offer.rooms, offer.guests);
//   renderTime(cardElement.querySelector('.popup__text--time'), offer.checkin, offer.checkout);
//   renderFeatures(cardElement.querySelector('.popup__features'), offer.features);
//   renderTextElement(cardElement.querySelector('.popup__description'), offer.description);
//   renderPhotos(cardElement.querySelector('.popup__photos'), offer.photos);
//   renderAvatar(cardElement.querySelector('.popup__avatar'), cardElementTemplate.author.avatar);

//   map.insertBefore(cardElement, filtersContainer);
// };

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

var validateCapacity = function () {
  var roomNumber = adForm.querySelector('#room_number').value;
  var guestsNumber = adForm.querySelector('#capacity').value;

  if (roomNumber === '100' && guestsNumber !== '0') {
    adForm.querySelector('#capacity').setCustomValidity('100 комнат — «не для гостей»');
  } else if (roomNumber >= guestsNumber && guestsNumber !== '0' || roomNumber === '100' && guestsNumber === '0') {
    adForm.querySelector('#capacity').setCustomValidity('');
  } else {
    if (roomNumber === '1') {
      adForm.querySelector('#capacity').setCustomValidity('1 комната — «для 1 гостя»');
    } else if (roomNumber === '2') {
      adForm.querySelector('#capacity').setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumber === '3') {
      adForm.querySelector('#capacity').setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    }
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

var fillAddress = function (referencePoint) {
  var left = '';
  var top = '';

  if (referencePoint === 'center') {
    left = getPinCoordinates(mainPin).left + MAIN_PIN_WIDTH / 2;
    top = getPinCoordinates(mainPin).top + MAIN_PIN_WIDTH / 2;
  } else if (referencePoint === 'pointer') {
    left = getPinCoordinates(mainPin).left + MAIN_PIN_WIDTH / 2;
    top = getPinCoordinates(mainPin).top + MAIN_PIN_HEIGHT / 2;
  }

  adForm.querySelector('#address').value = left + ', ' + top;
};

var activatePage = function () {
  map.classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');
  enableFieldsets(adForm);

  filtersForm.classList.remove('map__filters--disabled');
  enableFieldsets(filtersForm);

  mainPin.removeEventListener('mousedown', onMainPinLeftMousedown);
  mainPin.removeEventListener('keydown', onMainPinEnterPress);
  fillAddress('pointer');

  validateCapacity();
};

var onMainPinMousemove = function () {
  fillAddress('pointer');
};

var onMainPinLeftMousedown = function (evt) {
  if (evt.button === LEFT_BUTTON) {
    activatePage();
    mainPin.addEventListener('mousemove', onMainPinMousemove);
  }
};

var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
};

var onCapacityChange = function () {
  validateCapacity();
};

disableFieldsets(adForm);
disableFieldsets(filtersForm);
fillAddress('center');
mainPin.addEventListener('mousedown', onMainPinLeftMousedown);
mainPin.addEventListener('keydown', onMainPinEnterPress);
adForm.querySelector('#room_number').addEventListener('change', onCapacityChange);
adForm.querySelector('#capacity').addEventListener('change', onCapacityChange);

var pinsData = generatePins(DATA, PINS_COUNT);
renderPins(pinsData);
