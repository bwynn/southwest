(function() {
  // gallery object used to be called from the event handlers within the galleryCtrl
  // anonymous function below
  var gallery = {
    setWidth: function() {
      // This iterates through the figure tags and changes the width property
      // of the images when invoked, which happens to be upon user trigger.
      var imgSize = $("#galleryOuter > #galleryWrap > figure.backgd");  //document.querySelectorAll('#galleryOuter > #galleryWrap > figure.backgd');
      var size = $("#galleryOuter").width();  //document.getElementById('galleryOuter').offsetWidth;

      // loop through the elements to assign a width value. jQuery could
      // use the each method to perform the same behavior
      for (var i = 0; i < imgSize.length; i++) {
        $(imgSize[i]).css("width", size + "px");  // vanilla js //imgSize[i].style.width = '' + size + 'px';
      }
    },
    next: function(){
      var size = $('#galleryOuter').width();
      var slides = $('.backgd');
      var dotnav = $(".dotnavwrap a");
      var one = $(".dotnavwrap a")[1];
      var two = $(".dotnavwrap a")[2];

        // 3 slide gallery, basic logic determines slide positions
        // conditional statement determines current transform values applied to the
        // .backgd elements. Logical or condition determines between no style
        // value applied and style applied for boolean determinations
        dotnav.removeClass("active");
        if (slides.css("transform") == "none" ||
            slides.css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
          slides.css("transform", "translateX(-" + size + "px)");
          one.classList.add("active");
        } else {
          // translate to farthest slide
          slides.css("transform", "translateX(-" + size*2 + "px)");
          two.classList.add("active");
        }
      },
    previous: function(){
      // this will take the window width and use that number to decrement the
      // property of the translate style on the gallery figure elements
      var size = $('#galleryOuter').width();
      var slides = $('.backgd');
      var dotnav = $(".dotnavwrap a");
      var zero = $(".dotnavwrap a")[0];
      var one = $(".dotnavwrap a")[1];

      dotnav.removeClass("active");
      // a reverse of the 3 slide gallery conditional from above, except
      // no 'or' statement required, as style has already been applied
      // by the time a user arrives at the far slide
      if (slides.css("transform") == "matrix(1, 0, 0, 1, -" + size*2 + ", 0)") {
        slides.css("transform", "translateX(-" + size + "px)");
        one.classList.add("active");
      } else {
        slides.css("transform", "translateX(0px)");
        zero.classList.add("active");
      }
      // loop through dotnav anchor elements, remove active class from all elements and
      // then set index to the next
    }
  };

  // -------------------------- DOM METHODS ---------------------------- */
  /*var paddleDisplay = function() {
    var paddles = $("#galleryOuter > nav > ul");

    // show paddles
    if (paddles.css("display") === "none") {
      paddles.css("opacity", 1).fadeIn(400);
    }
    else if (paddles.css("display") === "block") {
      paddles.fadeTo(300, 0).hide(300);
    }
    else {
      console.log("something went wrong with the paddle display dom method");
    }
    // conditional to remove unavailable paddle;
  };*/
  // ------------------------- END DOM METHODS ------------------------- */

  var setSlide = function( slides, navItem ) {
    var size = $('#galleryOuter').width(),
        zero = $(".dotnavwrap a")[0],
        one = $(".dotnavwrap a")[1],
        two = $(".dotnavwrap a")[2];

    // run a for loop through each indexed item. declare using each method
    // to determine slide index. translateX(-" + ( slide[i] * 2 ) + 'px'
    /*for (var i = 0; i < navItem.length; i++) {
      if ( navItem[i].getAttribute("class") === "active") {
        return slides.css("transform", "translateX(-" + size[i]*2 + ")")
      }
    }*/

    // switcher between the three dotnavs
    // conditional determines the class attribute for the first
    // two dotnav elements
    if (zero.getAttribute("class") == "active") {
      slides.css("transform", "translateX(0px)");
    }
    else if (one.getAttribute("class") == "active") {
      slides.css("transform", "translateX(-" + size + "px)");
    }
    else if (two.getAttribute("class") == "active" ) {
      slides.css("transform", "translateX(-" + size*2 + "px)");
    }
    else {
      return slides.css("transform", "translateX(0px)");
    }
  };

  // self-invoked function returns access to the event handlers when the page loads
  var paddleNavEvent = function() {
    var leftPaddle = $('#left a');
    var rightPaddle = $('#right a');

    leftPaddle.on('click', function(e) {
      // set the width of the gallery slide
      gallery.setWidth();
      // advance to the previous slide
      gallery.previous();
    });

    rightPaddle.on('click', function(e) {
      // set the width of the gallery slide
      gallery.setWidth();
      // advance to the next slide
      gallery.next();
    });
  };

  var dotNavEvent = function() {
    var dotnav = $(".dotnavwrap a");

    // changes classes when user interacts with the dotnav anchor tag
    dotnav.on("click", function() {
      var slides = $('figure.backgd'),
          navItem = $(".dotnavwrap a");
      // change classes
      // remove active from full list of dotnav elements
      dotnav.removeClass("active");
      // get rid of jquery mobile's default invoked ui-link class
      dotnav.removeClass("ui-link");
      // add the class back onto the clicked dotnav element
      $(this).addClass("active");
      // invoke setSlide function
      setSlide( slides, navItem );
      // use the gallery.setWidth() method to re-establish window size if
      // user has changed orientation or size of the viewport
      gallery.setWidth();
    });
  };

  /*var paddleDisplayEvent = function() {
    var hero = $("section#hero");

      hero.on("mouseenter", function() {
        paddleDisplay();
      });
      hero.on("mouseleave", function() {
        paddleDisplay();
      });
  };*/

  var touchSwipeEvent = function() {
    var swipe = $("figure.backgd");
    swipe.on("swiperight", function() {
      gallery.previous();
    });

    swipe.on("swipeleft", function() {
      gallery.next();
    });
  };

  var resizeEvent = function() {
    $(window).resize(function() {
      var slides = $('figure.backgd');

      gallery.setWidth();
      slides.css("transform", "translateX(0px)");
    });
  };


  var init = function() {
    // initialize paddle nav event
    paddleNavEvent();

    // initialize dot nav event
    dotNavEvent();

    // initialize paddle display event
    //paddleDisplayEvent();

    // initialize touch swipe event
    touchSwipeEvent();

    // resize event
    resizeEvent();

    // establish window width for gallery nav
    gallery.setWidth();

  };

  return init();
}());

$(document).ready(function() {
  // get rid of instantiated content from jquery mobile
  $("div.ui-loader").remove();
});
