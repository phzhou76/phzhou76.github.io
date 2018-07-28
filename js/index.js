/* Scripts for the Portfolio. */

/* Required to avoid conflicts with multiple Javascript libraries. */
$.noConflict();
jQuery(document).ready(function($) {

  /* Initialization of Stellar Javascript for parallax elements. */
  $(window).stellar({
    responsive: true,
    horizontalScrolling: false
  });


  /* Methods section. */

  /**
   * Toggles the elements of the navigation bar to be active or inactive.
   */
  function menuToggle(event) {
    event.preventDefault();

    /* Change the image of the toggle butotn. */
    $("#menu-icon").toggleClass("fa-toggle-left");
    $("#menu-icon").toggleClass("fa-toggle-right");

    /* Toggles the transparency of the sidebar. */
    $("#sidebar-container").toggleClass("active");

    /* Enables the hyperlink elements inside the sidebar. */
    $(".sidebar-nav li a").toggleClass("disabled");

    /* Determines the color of the sidebar toggle button. */
    $("#menu-toggle").toggleClass("menu-active");
    $("#menu-toggle").toggleClass("menu-inactive");
  }

  /**
   * Moves the current view to the clicked section.
   */
  function moveToSection() {
    /* Find first '/' symbol in string, replace with ''. */
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
      location.hostname == this.hostname) {
      var target = $(this.hash);

      /* Take the last element of the hash, create a new string, attempts to find
       * element with that ID.
       */
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      /* Move the user view to the target page's top offset over the duration of
       * 1 second.
       */
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    }
  }


  /* Listener setup. */

  /* Call menuToggle if menu-toggle is clicked. */
  $("#menu-toggle, .sidebar-nav li a").click(menuToggle);

  /* Listener for the sidebar options. */
  $("a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])").click(moveToSection);

  /* Initializing calls. */
  $(".header-text").toggleClass("active");
});
