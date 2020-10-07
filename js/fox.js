var scrolltoOffset = $('#header').outerHeight() - 1;
$(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();

            var scrollto = target.offset().top - scrolltoOffset;

            if ($(this).attr("href") == '#header') {
                scrollto = 0;
            }

            $('html, body').animate({
                scrollTop: scrollto
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.nav-menu, .mobile-nav').length) {
                $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                $(this).closest('li').addClass('active');
            }

            if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                $('.mobile-nav-overly').fadeOut();
            }
            return false;
        }
    }
});

// Activate smooth scroll on page load with hash links in the url
$(document).ready(function () {
    if (window.location.hash) {
        var initial_nav = window.location.hash;
        if ($(initial_nav).length) {
            var scrollto = $(initial_nav).offset().top - scrolltoOffset;
            $('html, body').animate({
                scrollTop: scrollto
            }, 1500, 'easeInOutExpo');
        }
    }
});

// Navigation active state on scroll
var nav_sections = $('section');
var main_nav = $('.nav-menu, .mobile-nav');

$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
        var top = $(this).offset().top,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            if (cur_pos <= bottom) {
                main_nav.find('li').removeClass('active');
            }
            main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
        }
        if (cur_pos < 300) {
            $(".nav-menu ul:first li:first").addClass('active');
        }
    });
});

// Mobile Navigation
if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                $('.mobile-nav-overly').fadeOut();
            }
        }
    });
} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
}


/*
Scroll header
*/

// Stick the header at top on scroll
/*
let aboutoffset = $("body").offset().top;
$(window).scroll(function(){

    let wScroll = $(window).scrollTop();

    if(wScroll > aboutoffset)
    {

       header.style.top = "-110px";
    }

    else {

       header.style.top = "0px";
    }

});
*/

$("#btnUp").click(function () {

    $("html,body").animate({scrollTop: '0'}, 3000)

})


$(window).on('load', function () {
    var portfolioIsotope = $('.pricing-container').isotope({
        itemSelector: '.pricing-item',
        layoutMode: 'fitRows',
        rtl: true
    });

    $('#pricing-flters li').on('click', function () {
        $("#pricing-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');


    });


    /*
    $("a").click(function(){

          let aHref = $(this).attr("href");

        let Sectionoffset = $(aHref).offset().top;

        $("html,body").animate( {scrollTop: Sectionoffset} , 1000)
    });
    */
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        center: true,
        animateIn: true,
        rtl: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    })


    $('.collapsed').click(function () {
        $(this).next('.collapse').slideToggle();
        $(this).parent().addClass('active');
        $(this).parent().slibings().children('.content').slideUp();
        $(this).parent().slibings().removeClass('acctive')

    });
});
/***************************************************************************************
 * uploading an image with drag and drop
 */

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}


function show_hide() {

    var click = document.getElementById("drop-content");

    if (click.style.display === "none") {

        click.style.display = "block";

    } else {

        click.style.display = "none";
      

    }
}

$(document).on('click', '#main',function(){

    $("#drop-content").hide();
});


$('input[name="intervaltype"]').click(function () {
   var $tab = $(this).data('pricing-tab');
   $(".pricing-tab").hide();
   $($tab).fadeIn();
    // $(this).tab('show');
});
