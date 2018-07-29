/* Scripts for the Portfolio. */

/* Required to avoid conflicts with multiple Javascript libraries. */
$.noConflict();
jQuery(document).ready(function($) {

  /* Initialization of Stellar Javascript for parallax elements. */
  $(window).stellar({
    responsive: false,
    horizontalScrolling: false
  });


  /* Methods section. */

  /**
   * Toggles the elements of the navigation bar to be active or inactive.
   */
  function menuToggle(event) {
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

  /* Listener setup. */

  /* Call menuToggle if menu-toggle is clicked. */
  $("#menu-toggle, .sidebar-nav li a").click(menuToggle);

  /* Disable default behavior of the menuToggle button. */
  $("#menu-toggle").click(
    function(event) {
      event.preventDefault();
      return false;
    }
  );

  /* Initializing calls. */
  $(".header-text").toggleClass("active");
});
