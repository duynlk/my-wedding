(function ($) {
    "use strict";

    setTimeout(function(){
        $('#btn-left').animate({width:'toggle'},1000);
    }, 2000);

    $(document).on("contextmenu", function(e) {
        e.preventDefault();
    });

    var isShowRsvp = false;

    $("#btn-inbox").click(function () {
        $('#rsvpModal').modal('show');
        isShowRsvp = true;
    });

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }

        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
            if (!isShowRsvp){
                $('#rsvpModal').modal('show');
                isShowRsvp = true;
                $('#btn-inbox').fadeIn('slow');
            }
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });

    // click audio
    var isToggle = false;
    $("#btn-sound, #btn-left").click(function () {
        var src = $("#btn-sound").prop("src");
        if(src.includes("sound.png")){
            $('#player').trigger("pause");
            $("#btn-sound").prop("src","img/mute.png");
        }else{
            if(!isToggle){
                $('#btn-left').animate({width:'toggle'},1000);
                isToggle = true;
            }
            $('#player').trigger("play");
            $("#btn-sound").prop("src","img/sound.png");
        }
    });

    // change src image
    function changeImageSrc() {
        if (window.matchMedia("(max-width: 1200px)").matches) {
            $("img#carousel-img").attr("src", "img/event-1.jpg");
            $("img#carousel-img").css("object-position", "");
        } else {
            $("img#carousel-img").attr("src", "img/carousel-1.jpg");
            $("img#carousel-img").css("object-position", "0 8%");
        }

        if (window.matchMedia("(max-width: 480px)").matches) {
            $("#gallery-mobile").css("display","block");
            $("#gallery-web").css("display","none");
            $("#gallery-content").css("margin-bottom","25px");
        } else {
            $("#gallery-web").css("display","block");
            $("#gallery-mobile").css("display","none");
            $("#gallery-content").css("margin-bottom","120px");
        }
    }

    // call change src image
    changeImageSrc();
    $(window).resize(function() {
        changeImageSrc();
    });

    $('#commitRsvp, #nameRsvp, #msgRsvp').on('change', function(){
        $(this).addClass('border-0');
    });

    $('#submitRsvp').on('click', function(){
        var nameRsvp = $('#nameRsvp').val();
        var commitRsvp = $('#commitRsvp').val();
        var msgRsvp = $('#msgRsvp').val();
        var isSubmit = true;

        if (nameRsvp == ''){
            $('#nameRsvp').removeClass('border-0')
            $('#nameRsvp').css('border', '1px solid #E47A2E');
            isSubmit = false;
        }

        if (msgRsvp == ''){
            $('#msgRsvp').removeClass('border-0')
            $('#msgRsvp').css('border', '1px solid #E47A2E');
            isSubmit = false;
        }

        if (isSubmit){
            var commitText = 'N/A';
            if(commitRsvp == '0'){
                commitText = 'Thật tiếc, mình không đến được';
            }else if(commitRsvp == '1'){
                commitText = 'Tất nhiên rồi!';
            }

            $.ajax({
                url: "https://formsubmit.co/ajax/nguyenlukhanhduy@gmail.com",
                method: "POST",
                data: {
                    name: nameRsvp + ' - ' + commitText,
                    message: msgRsvp
                },
                dataType: "json",
                accepts: 'application/json',
                async: true
            });

            $('#submit-thank').show(500);
            setTimeout(function(){
                $('#rsvpModal').modal('hide');
            }, 2000);
        }
    });

    function startMarquee() {
        var textWidth = $("#marquee-text").width();
        var containerWidth = $("#marquee-container").width();
        
        $("#marquee-text").css({ left: containerWidth });

        $("#marquee-text").animate(
            { left: -textWidth },
            60000,
            "linear",
            startMarquee
        );
    }

    startMarquee();
})(jQuery);