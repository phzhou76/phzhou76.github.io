// Scripts for Phillip's Portfolio.

/* When the menu-close element in the sidebar container is clicked, the 
 * sidebar will close. */
$("#menu-close").click(function (event) {
    event.preventDefault();
    $("#sidebar-container").toggleClass("active");
});

/* When the menu-open element in the sidebar container is clicked, the
 * sidebar will open, covering up the menu-open element. */
$("#menu-open").click(function (event) {
    event.preventDefault();
    $("#sidebar-container").toggleClass("active");
});

/* This function will move the user to the clicked section. The function listens to
 * all <a> elements that have href attrib that has a '#' in it. Leave out any
 * elements that have exactly '#' as href, or any of the other [attrib].*/
$('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function () {
    /* Find first '/' symbol in string, replace with ''. */
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        // Takes the last element of the hash, creates a new string, tries to find element with that ID.
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Move the user view to the target page's top offset over the duration of 1 second.
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

// Status on if the to-top button is being shown - true if it is shown.
var fixedTop = false;
var fixedBottom = false;

var documentBottomLoc = $(document).height() - $(window).height();

/* This function determines, based on how far down the user scrolled, whether or
 * not to show a button that allows the user to move back to the top. */
$(document).scroll(function () {
    /* To-top button will not show until scroll distance is more than 250 units down. 
     * But, show the to-next button. */
    if ($(this).scrollTop() <= 250) {
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
        if (!fixedBottom) {
            fixedBottom = true;
            $("#to-next").fadeIn(250, function () {
                $("#to-next").css({
                    display: "block"
                });
            });
        }
    }
    /* Middle of the document. */
    else if ($(this).scrollTop() > 250 && (documentBottomLoc - $(window).scrollTop()) > 250) {
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
        if (!fixedBottom) {
            fixedBottom = true;

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
        if (fixedBottom) {
            fixedBottom = false;
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