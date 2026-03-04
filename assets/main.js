var deadline = new Date("September 19, 2026 13:59:59");

function updateTimer(deadline) {
    var time = deadline - new Date();
    return {
        'days': Math.floor(time / (1000 * 60 * 60 * 24)),
        'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((time / 1000 / 60) % 60),
        'total': time
    };
}

function startTimer(deadline) {
    var timerInterval = setInterval(function () {
        var timer = updateTimer(deadline);
        $('#timerDays').text(timer.days);
        $('#timerHours').text(timer.hours);
        $('#timerMinutes').text(timer.minutes);
        if (timer.total < 1) {
            clearInterval(timerInterval);
            $('#timerDays').text('0');
            $('#carouselTimerDays').text('0');
            $('#timerHours').text('0');
            $('#carouselTimerHours').text('0');
            $('#timerMinutes').text('0');
            $('#carouselTimerMinutes').text('0');
        }
    }, 1000);
}

function getSectionOffset() {
        return $('section.menu-trigger').offset().top;
    }

/*$(document).ready(function(){
    startTimer(deadline);
});*/

// Toggle menu on hamburger click
$('#hamburger').on('click', function () {
    $(this).toggleClass('active');
    $('#menuOverlay').toggleClass('active');
    $('body').toggleClass('menu-open');
});

// Close menu when clicking a link
$('.menu-nav a').on('click', function () {
    $('#hamburger').removeClass('active');
    $('#menuOverlay').removeClass('active');
    $('body').removeClass('menu-open');
});

// Close menu on escape key
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('#menuOverlay').hasClass('active')) {
        $('#hamburger').removeClass('active');
        $('#menuOverlay').removeClass('active');
        $('body').removeClass('menu-open');
    }
});


$("section#zazitek div.accordion div.at-title").on('click', function () {
    $(this)
        .toggleClass("active")
        .next(".at-tab")
        .slideToggle()
        .parent()
        .siblings()
        .find(".at-tab")
        .slideUp()
        .prev()
        .removeClass("active");
});



    var sectionOffset = getSectionOffset();

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > sectionOffset) {
            $('header').addClass('tucked');
        } else {
            $('header').removeClass('tucked');
        }
    });

    $(window).on('resize', function() {
        sectionOffset = getSectionOffset();
    });

