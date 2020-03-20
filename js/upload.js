'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.utils.STATUS_CODE.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
