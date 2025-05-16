window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "https://homes.cs.washington.edu/~kpar/nerfies/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function () { return false; };
  image.oncontextmenu = function () { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state);
    });
  }

  // preloadInterpolationImages();

  // $('#interpolation-slider').on('input', function(event) {
  //   setInterpolationImage(this.value);
  // });
  // setInterpolationImage(0);
  // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  // bulmaSlider.attach();

  document.getElementById("single-task-result-video").playbackRate = 2.0;
  document.getElementById("multi-task-result-video").playbackRate = 2.0;
})

function changeTab(evt, testCaseName, idPostfix) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    if (tabcontent[i].id.includes(idPostfix)) {
      tabcontent[i].style.display = "none";
    }
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    if (tablinks[i].id.includes(idPostfix)) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(testCaseName).style.display = "block";
  evt.currentTarget.className += " active";
}

function changeVideo(selectorID, videoPlayerID) {
  const videoSrc = document.getElementById(selectorID).value;
  const videoPlayer = document.getElementById(videoPlayerID);
  videoPlayer.src = videoSrc;
  videoPlayer.load();
  videoPlayer.play();
}