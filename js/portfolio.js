// Scripts for Phillip's Portfolio.

// Pre-calculated fields.
var elementSizes = {
    about_offset: null,
    skillset_offset: null,
    portfolio_offset: null,
    document_bottom: null
}

// Needed to avoid conflict with other Javascript libraries.
$.noConflict();
jQuery(document).ready(function ($) {
    // Recalculates all sizes for offsets and document.
    function recalculateSizes() {
        var aboutElem = $("#about");
        elementSizes.about_offset = aboutElem.length ? aboutElem.offset().top : 0;
        var skillElem = $("#skillset");
        elementSizes.skillset_offset = skillElem.length ? skillElem.offset().top : 0;
        var portfolioElem = $("#portfolio");
        elementSizes.portfolio_offset = portfolioElem.length ? portfolioElem.offset().top : 0;

        elementSizes.document_bottom = $(document).height() - $(window).height();
    }

    // Hide all skills
    $(".skill-item").hide();

    // Hide to-top button.
    $("#to-top").hide();

    // Initially calculate all sizes.
    recalculateSizes();

    /* Need to recalculate the document sizes whenever the window size changes. */
    $(window).resize(function () {
        recalculateSizes();
    });

    /* When the menu-open element in the sidebar container is clicked, the
     * sidebar will open, covering up the menu-open element. Also, if any sections
     * within the sidebar are clicked, the menu will close. */
    $("#menu-toggle, .sidebar-nav li a").click(function (event) {
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
    });

    /* This function will move the user to the clicked section. The function listens to
     * all <a> elements that have href attrib that has a '#' in it. Leave out any
     * elements that have exactly '#' as href, or any of the other [attrib].*/
    $("a[href*=#]:not([href=#], [href=#next], [data-toggle],[data-target],[data-slide])").click(function (event) {
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
    });

    // Status on if the to-top button is being shown - true if it is shown.
    var fixedTop = false;
    var FixedBottom = false;

    /* This function will move the user to the next section, which is the section below the
    * current one that the user is on. */
    $("a[href=#next]").click(function (event) {
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
    });

    /* This function determines, based on how far down the user scrolled, whether or
     * not to show a button that allows the user to move back to the top. */
    $(document).scroll(function (event) {
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
    });

    /* Switches the images when a mouse hovers over the profile image. */
    $(".image-center").mouseover(ChangePicture);
    $(".image-center").mouseout(ChangePicture);

    /* Listener function for the image switching effect. */
    function ChangePicture(event) {
        $("#switch-image").toggleClass("image-active");
    }

    /* Expands or shrinks the programming languages skills section. */
    $("#toggle-pl").click(TogglePLSection);

    PLSectionShown = false;

    /* Listener function for toggling the programming languages section. */
    function TogglePLSection(event) {
        if (PLSectionShown === false) {
            Effect.SlideDown('skill-cplusplus', { duration: 0.7 });
            Effect.SlideDown('skill-java', { duration: 0.7 });
            Effect.SlideDown('skill-csharp', { duration: 0.7 });
            Effect.SlideDown('skill-python', { duration: 0.7 });
            Effect.SlideDown('skill-javascript', { duration: 0.7 });
            Effect.SlideDown('skill-html', { duration: 0.7 });
            Effect.SlideDown('skill-css', { duration: 0.7 });
            PLSectionShown = true;
        }
        else {
            Effect.SlideUp('skill-cplusplus', { duration: 0.7 });
            Effect.SlideUp('skill-java', { duration: 0.7 });
            Effect.SlideUp('skill-csharp', { duration: 0.7 });
            Effect.SlideUp('skill-python', { duration: 0.7 });
            Effect.SlideUp('skill-javascript', { duration: 0.7 });
            Effect.SlideUp('skill-html', { duration: 0.7 });
            Effect.SlideUp('skill-css', { duration: 0.7 });
            PLSectionShown = false;
        }
        recalculateSizes();
    }

    /* Expands or shrinks the technologies skills section. */
    $("#toggle-tech").click(ToggleTechSection);

    TechSectionShown = false;

    /* Listener function for toggling the technologies section. */
    function ToggleTechSection(event) {
        if (TechSectionShown === false) {
            Effect.SlideDown('skill-git', { duration: 0.7 });
            Effect.SlideDown('skill-blender', { duration: 0.7 });
            Effect.SlideDown('skill-maya', { duration: 0.7 });
            Effect.SlideDown('skill-opengl', { duration: 0.7 });
            TechSectionShown = true;
        }
        else {
            Effect.SlideUp('skill-git', { duration: 0.7 });
            Effect.SlideUp('skill-blender', { duration: 0.7 });
            Effect.SlideUp('skill-maya', { duration: 0.7 });
            Effect.SlideUp('skill-opengl', { duration: 0.7 });
            TechSectionShown = false;
        }
        recalculateSizes();
    }

    /* Timer function that switches images every 5 seconds. */
    setInterval(ChangeCallout, 5000);

    function ChangeCallout() {
        var child = $(".callout-div").find(".callout-bot");
        child.toggleClass("callout-active");
    }

});