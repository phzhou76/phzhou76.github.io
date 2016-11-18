// Scripts for Phillip's Portfolio.

// Needed to avoid conflict with other Javascript libraries.
$.noConflict();
jQuery(document).ready(function ($) {
    /* Variables. */

    // Pre-calculated fields for document element sizes.
    var elementSizes = {
        about_offset: null,
        skillset_offset: null,
        portfolio_offset: null,
        document_bottom: null
    }

    // Indicates if programming languages skillset is being shown.
    var PLSectionShown = false;

    // Indicates if technology skillset is being shown.
    var TechSectionShown = false;

    // Status on if the to-top button is being shown - true if it is shown.
    var fixedTop = false;

    // Status on if the to-next button is being shown - true if it is shown.
    var FixedBottom = false;



    /* Functions. */

    /* Recalculates all sizes for offsets and document. */
    function recalculateSizes() {
        var aboutElem = $("#about");
        elementSizes.about_offset = aboutElem.length ? aboutElem.offset().top : 0;
        var skillElem = $("#skillset");
        elementSizes.skillset_offset = skillElem.length ? skillElem.offset().top : 0;
        var portfolioElem = $("#portfolio");
        elementSizes.portfolio_offset = portfolioElem.length ? portfolioElem.offset().top : 0;

        elementSizes.document_bottom = $(document).height() - $(window).height();
    }

    /* Listener function for the image switching effect. */
    function ChangePicture() {
        $("#switch-image").toggleClass("image-active");
    }

    /* Listener function for toggling the programming languages section. */
    function TogglePLSection() {
        if (PLSectionShown === false) {
            Effect.BlindDown("pl-rows");
            PLSectionShown = true;
        }
        else {
            Effect.BlindUp("pl-rows");
            PLSectionShown = false;
        }
        recalculateSizes();
    }

    /* Listener function for toggling the technologies section. */
    function ToggleTechSection() {
        if (TechSectionShown === false) {
            Effect.BlindDown("tech-row");
            TechSectionShown = true;
        }
        else {
            Effect.BlindUp("tech-row");
            TechSectionShown = false;
        }
        recalculateSizes();
    }

    /* Switches the images in the callout. */
    function ChangeCallout() {
        var child = $(".callout-div").find(".callout-bot");
        child.toggleClass("callout-active");
    }

    /* Toggles the elements of the navigation sidebar. */
    function MenuToggle(event) {
        event.preventDefault();

        // Changes the images of the toggle button.
        $("#toggle-right").toggleClass("active");
        $("#toggle-left").toggleClass("active");

        // Allows the sidebar to not be transparent.
        $("#sidebar-container").toggleClass("active");

        // Enables the hyperlink elements inside the sidebar.
        $(".sidebar-nav li a").toggleClass("active");
        $(".sidebar-nav li a").toggleClass("disabled");

        // Determines the color of the toggle button.
        $("#menu-toggle").toggleClass("menu-active");
        $("#menu-toggle").toggleClass("menu-inactive");
    }

    /* Moves the current view to the clicked section. */
    function MoveSection() {
        /* Find first '/' symbol in string, replace with ''. */
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            || location.hostname == this.hostname) {
            var target = $(this.hash);

            // Takes the last element of the hash, creates a new string, tries to find element with that ID.
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Move the user view to the target page's top offset over the duration of 1 second.
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            }
        }
    }

    /* Moves the current view to the next section. */
    function MoveNext() {
        /* Find first '/' symbol in string, replace with ''. */
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            || location.hostname == this.hostname) {
            /* Figure out where the user is located in. */
            var distanceFromTop = $(document).scrollTop();
            var nextSection = null;

            // If not completely below about section, set next to about.
            if (distanceFromTop < elementSizes.about_offset) {
                nextSection = "#about";
            }
                // If not completely below skillset section, set next to skillset.
            else if (distanceFromTop < elementSizes.skillset_offset) {
                nextSection = "#skillset";
            }
                // If not completely below portfolio section, set next to portfolio.
            else if (distanceFromTop < elementSizes.portfolio_offset) {
                nextSection = "#portfolio";
            }
                // If not at contact, set next to contact.
            else {
                nextSection = "#contact";
            }

            var target = $(nextSection);

            // Takes the last element of the hash, creates a new string, tries to find element with that ID.
            if (target.length) {
                // Move the user view to the target page's top offset over the duration of 1 second.
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
            }
        }
    }

    /* Toggles the navigation buttons in the bottom right. */
    function ToggleButtons() {
        var distanceFromTop = $(this).scrollTop();
        /* To-top button will not show until scroll distance is past about screen. */
        if (distanceFromTop <= 250) {
            // Disable to-top button if showing.
            if (fixedTop) {
                fixedTop = false;
                $("#to-top").fadeOut(250, function () {
                    $("#to-top").css({
                        display: "none"
                    });
                });
            }

            // Enable to-next button if not showing.
            if (!FixedBottom) {
                FixedBottom = true;
                $("#to-next").fadeIn(250, function () {
                    $("#to-next").css({
                        display: "block"
                    });
                });
            }
        }
            /* Middle of the document. */
        else if (distanceFromTop > 250 && (elementSizes.document_bottom - $(window).scrollTop()) > 250) {
            // Enable to-top button if not showing.
            if (!fixedTop) {
                fixedTop = true;
                $("#to-top").fadeIn(250, function () {
                    $("#to-top").css({
                        display: "block"
                    });
                });
            }

            // Enable to-next button if not showing.
            if (!FixedBottom) {
                FixedBottom = true;

                $("#to-top").animate({
                    bottom: "9%"
                }, 250);

                $("#to-next").fadeIn(500, function () {
                    $("#to-next").css({
                        display: "block"
                    });
                });
            }
        }
            /* End of the document. Hide the to-next button. */
        else {
            // Enable to-top button if not showing.
            if (!fixedTop) {
                fixedTop = true;
                $("#to-top").fadeIn(200, function () {
                    $("#to-top").css({
                        display: "block"
                    });
                });
            }

            // Disable the to-next button if showing.
            if (FixedBottom) {
                FixedBottom = false;
                $("#to-next").fadeOut(250, function () {
                    $("#to-next").css({
                        display: "none"
                    });
                });

                $("#to-top").animate({
                    bottom: "2%"
                }, 500);
            }
        }
    }



    /* Listener setup. */

    $(window).resize(recalculateSizes);
    $("#menu-toggle, .sidebar-nav li a").click(MenuToggle);
    $("a[href*=#]:not([href=#], [href=#next], [data-toggle],[data-target],[data-slide])").click(MoveSection);
    $("a[href=#next]").click(MoveNext);
    $(document).scroll(ToggleButtons);
    $(".image-center").mouseover(ChangePicture);
    $(".image-center").mouseout(ChangePicture);
    $("#toggle-pl").click(TogglePLSection);
    $("#toggle-tech").click(ToggleTechSection);



    /* Initializing calls. */
    $("#to-top").hide();
    $("#pl-rows").hide();
    $("#tech-row").hide();
    recalculateSizes();
    setInterval(ChangeCallout, 5000);

});