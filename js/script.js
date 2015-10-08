function slide( e, slides, tar ) {
  var width = $("#galleryOuter").width();
  console.log(width);
  console.log(e);
  if (e.classList.contains("active")) {
      console.log("This element is selected: " + e );
      slides.css("translateX(-" + width + "px)");
  }
  else {
      console.log("somethings up");
  }
}


var tar = $(".dotnavwrap li a");
tar.on("click", function(e) {

  var slides = $("figure.backgd");

  tar.removeClass("active");
  $(this).addClass("active");

  slide( e.target, slides, tar );

});

$(document).ready(function() {
  // get rid of instantiated content from jquery mobile
  $("div.ui-loader").remove();
});
