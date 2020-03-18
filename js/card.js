'use strict';
(function () {
  var TYPE = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var card = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var renderTextElement = function (element, text) {
    if (!text) {
      element.remove();
      return;
    }

    element.textContent = text;
  };

  var renderPrice = function (priceElement, price) {
    if (!price) {
      priceElement.remove();
      return;
    }

    var priceText = price + '₽/ночь';
    priceElement.textContent = priceText;
  };

  var renderType = function (typeElement, type) {
    if (!type) {
      typeElement.remove();
      return;
    }

    var typeText = TYPE[type];
    typeElement.textContent = typeText;
  };

  var renderCapacity = function (capacityElement, rooms, guests) {
    if (!rooms || !guests) {
      capacityElement.remove();
      return;
    }

    var capacity = rooms + ' комнаты для ' + guests + ' гостей';
    capacityElement.textContent = capacity;
  };

  var renderTime = function (timeElement, checkin, checkout) {
    if (!checkin || !checkout) {
      timeElement.remove();
      return;
    }

    var time = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    timeElement.textContent = time;
  };

  var renderFeatures = function (featuresList, featuresNames, data) {
    if (!featuresNames.length) {
      featuresList.remove();
      return;
    }

    var featuresElements = featuresList.querySelectorAll('li');
    var removeCount = 0;

    for (var i = 0; i < featuresElements.length; i++) {
      featuresElements[i].textContent = data.features[i];

      for (var j = i + removeCount; featuresNames[i] !== data.features[j]; j++) {
        featuresElements[j].remove();
        removeCount++;
      }
    }
  };

  var renderPhotos = function (photosList, photoLinks) {
    if (!photoLinks.length) {
      photosList.remove();
      return;
    }

    var photoElementTemplate = photosList.querySelector('img');
    photoElementTemplate.remove();

    for (var i = 0; i < photoLinks.length; i++) {
      var photoElement = photoElementTemplate.cloneNode(true);
      photoElement.src = photoLinks[i];
      photosList.appendChild(photoElement);
    }
  };

  var renderAvatar = function (avatar, src) {
    if (!src) {
      avatar.remove();
      return;
    }

    avatar.src = src;
  };

  var render = function (cardElementTemplate) {
    var cardElement = card.cloneNode(true);
    var offer = cardElementTemplate.offer;

    renderTextElement(cardElement.querySelector('.popup__title'), offer.title);
    renderTextElement(cardElement.querySelector('.popup__text--address'), offer.address);
    renderPrice(cardElement.querySelector('.popup__text--price'), offer.price);
    renderType(cardElement.querySelector('.popup__type'), offer.type);
    renderCapacity(cardElement.querySelector('.popup__text--capacity'), offer.rooms, offer.guests);
    renderTime(cardElement.querySelector('.popup__text--time'), offer.checkin, offer.checkout);
    renderFeatures(cardElement.querySelector('.popup__features'), offer.features, window.DATA);
    renderTextElement(cardElement.querySelector('.popup__description'), offer.description);
    renderPhotos(cardElement.querySelector('.popup__photos'), offer.photos);
    renderAvatar(cardElement.querySelector('.popup__avatar'), cardElementTemplate.author.avatar);

    return cardElement;
  };

  window.card = {
    render: render
  };
})();