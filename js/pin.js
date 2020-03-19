'use strict';
(function () {
  var pin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

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
    render: render
  };
})();
