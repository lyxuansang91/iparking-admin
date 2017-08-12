$(".carousel-slider")
  .dblclick(function () {

    if ($(".page-bar").css('display') == 'none') {
      $('.page-sidebar').css({"right": ""});

      $('.page-bar').css({"display": ""});

      $('.page-content').removeClass('full-screen');
    } else {
      $('.page-sidebar').css({"right": "100px"});

      $('.page-bar').css({"display": "none"});

      $('.page-content').addClass('full-screen');
    }

  });

$(".go-full-screen").click(function () {

  if ($(".page-bar").css('display') == 'none') {
    $('.page-sidebar').css({"right": ""});

    $('.page-bar').css({"display": ""});

    $('.page-content').removeClass('full-screen');
  } else {
    $('.page-sidebar').css({"right": "100px"});

    $('.page-bar').css({"display": "none"});

    $('.page-content').addClass('full-screen');
  }

});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    $('.page-sidebar').css({"right": ""});

    $('.page-bar').css({"display": ""});

    $('.page-content').removeClass('full-screen');
  }
});