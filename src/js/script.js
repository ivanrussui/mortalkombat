$(document).ready(function () {
  // vide.js видео фоном на сайте
  $('#app').vide({
    mp4: 'video/video.mp4',
    webm: 'video/video.webm',
    ogv: 'video/video.ogv',
  });

  // modal
  $('#primary').on('click', function () {
    $('.overlay, #subscribe').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #subscribe, #thanks').fadeOut('slow');
  });

  // валидаця формы
  $('#form').validate({
    rules: {
      name: 'required',
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: 'Пожалуйста, введите свое имя',
      email: {
        required: 'Пожалуйста, введите свою почту',
        email: 'Неправильно введена почта',
      },
    },
  });

  // ajax
  $('#form').submit(function (e) {
    e.preventDefault();

    // это условие внутри Ajax чтобы письмо пустым не отправлялось
    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(function () {
      $(this).find('input').val('');
			$('#subscribe').fadeOut('slow');
			$('#thanks').fadeIn('slow');


      $('form').trigger('reset');
    });
    return false;
  });

	$('.modal__close').on('click', function () {
    $('.overlay, #thanks').fadeOut(500);
  });
});
