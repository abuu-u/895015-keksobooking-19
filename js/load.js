'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.utils.STATUS_CODE.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
