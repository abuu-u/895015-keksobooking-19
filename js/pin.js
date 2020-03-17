'use strict';
(function () {
  var pinsContainer = document.querySelector('.map').querySelector('.map__pins');
  var pin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var generateAvatar = function (path, i, format) {
    if (!path || !format) {
      return '';
    }

    return path + '0' + (i + 1) + format;
  };

  var generateLocation = function (location) {
    var obj = {
      x: window.utils.getRandom(pinsContainer.offsetWidth),
      y: window.utils.getRandomInRange(location)
    };

    return obj;
  };

  var generate = function (data, pinsCount) {
    var pins = [];

    for (var i = 0; i < pinsCount; i++) {
      pins.push({
        index: i,
        author: {
          avatar: generateAvatar(data.avatar.path, i, data.avatar.format)
        },

        offer: {
          title: data.title,
          address: data.address,
          price: data.price,
          type: window.utils.getRandomElement(data.type),
          rooms: data.rooms,
          guests: data.guests,
          checkin: window.utils.getRandomElement(data.checkin),
          checkout: window.utils.getRandomElement(data.checkout),
          features: window.utils.generateNewArray(data.features),
          description: data.description,
          photos: window.utils.generateNewArray(data.photos)
        },

        location: generateLocation(data.locationY)
      });
    }

    return pins;
  };

  var render = function (pinElementTemplate, offsetX, offsetY) {
    var pinElement = pin.cloneNode(true);
    var pinX = pinElementTemplate.location.x - offsetX;
    var pinY = pinElementTemplate.location.y - offsetY;

    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = pinElementTemplate.author.avatar;
    pinElement.querySelector('img').alt = pinElementTemplate.title;

    return pinElement;
  };

  window.pin = {
    generate: generate,
    render: render
  };
})();
