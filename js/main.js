// Файл setup.js
'use strict';

var DATA = {
  avatar: {
    path: 'img/avatars/user',
    format: '.png'
  },

  title: '',
  address: ['600', '350'],
  price: '',
  type: ['palace', 'flat', 'house', 'bungalo'],
  rooms: '',
  guests: '',
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parkin', 'washer', 'elevator', 'conditioner'],
  description: '',
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  locationY: {
    start: 130,
    end: 630
  }
};

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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

  for (var i = 0; i < arrayRandomLength; i++) {
    newArray.push(getRandomElement(array));
  }

  return newArray;
};

var generatePins = function (data, pinsCount) {
  var pins = [];

  for (var i = 0; i < pinsCount; i++) {
    pins.push({
      author: {
        avatar: data.avatar.path + '0' + (i + 1) + data.avatar.format
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

      location: {
        x: getRandom(mapPins.offsetWidth) - PIN_WIDTH / 2,
        y: getRandomInRange(data.locationY) - PIN_HEIGHT
      }
    });
  }

  return pins;
};

var renderPin = function (pins) {
  var pinElement = pin.cloneNode(true);

  pinElement.style = 'left: ' + pins.location.x + 'px; top: ' + pins.location.y + 'px;';
  pinElement.querySelector('img').src = pins.author.avatar;
  pinElement.querySelector('img').alt = pins.title;

  return pinElement;
};

map.classList.remove('map--faded');

var pins = generatePins(DATA, PINS_COUNT);
var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);
