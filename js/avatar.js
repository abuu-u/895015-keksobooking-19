'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var imagesChooser = document.querySelector('#images');
  var avatar = document.querySelector('.ad-form-header__preview').querySelector('img');
  var images = document.querySelector('.ad-form__photo');

  var setImg = function (chooser, img) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarChooserChange = function () {
    setImg(avatarChooser, avatar);
  };

  var onImagesChooserChange = function () {
    var imagesContainer = images.cloneNode(true);
    var img = document.createElement('img');
    img.width = 70;
    img.setAttribute('height', 'auto');
    images.remove();
    setImg(imagesChooser, img);
    imagesChooser.parentNode.parentNode.appendChild(imagesContainer);
    imagesContainer.appendChild(img);
  };

  avatarChooser.addEventListener('change', onAvatarChooserChange);

  imagesChooser.addEventListener('change', onImagesChooserChange);
})();
