// Файл setup.js
'use strict';

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

var TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var filtersContainer = map.querySelector('.map__filters-container');

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

var renderFeatures = function (featuresList, featuresNames) {
  var featuresElements = featuresList.querySelectorAll('li');
  var removeCount = 0;

  for (var i = 0; i < featuresElements.length; i++) {
    featuresElements[i].textContent = FEATURES[i];

    for (var j = i + removeCount; featuresNames[i] !== FEATURES[j]; j++) {
      featuresElements[j].remove();
      removeCount++;
    }
  }
};

var renderPhoto = function (photoElementTemplate, photoLink) {
  var photoElement = photoElementTemplate.cloneNode(true);
  photoElement.src = photoLink;

  return photoElement;
};

var renderPhotos = function (photosList, photoLinks) {
  var photoElementTemplate = photosList.querySelector('img');
  photoElementTemplate.remove();

  for (var i = 0; i < photoLinks.length; i++) {
    photosList.appendChild(renderPhoto(photoElementTemplate, photoLinks[i]));
  }
};

var renderCard = function (cardElementTemplate) {
  var cardElement = card.cloneNode(true);
  var offer = cardElementTemplate[0].offer;
  var price = offer.price + '₽/ночь';
  var type = TYPE[offer.type];
  var capacity = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  var time = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = price;
  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = capacity;
  cardElement.querySelector('.popup__text--time').textContent = time;
  renderFeatures(cardElement.querySelector('.popup__features'), offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  renderPhotos(cardElement.querySelector('.popup__photos'), offer.photos);
  cardElement.querySelector('.popup__avatar').src = cardElementTemplate[0].author.avatar;

  map.insertBefore(cardElement, filtersContainer);
};

map.classList.remove('map--faded');
var pinsData = generatePins(DATA, PINS_COUNT);
renderPins(pinsData);
renderCard(pinsData);

