/////////////
//   MAP   //
/////////////

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [43.109163, 131.879100],
        zoom: 18,
        offset: [100, 100],
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([43.109162, 131.880428], {
        balloonContentBody: [
            '<address>',
            '<strong>Транспортная компания «Афина-ДВ»</strong>',
            '<br/>',
            'Адрес: г. Владивосток, ул. Верхнепортовая, д.5А, оф.105',
            '<br/>',
            'Тел./факс: (423) 241-34-35, 241-34-68; жд 48-231 (с 08-00 до 17-00)',
            '<br/>',
            'Тел.: (423) 271-50-56 (с 8-00 до 21-00)',
            '</address>'
        ].join('')
    }, {
        preset: 'islands#dotIcon',
        iconColor: '#005C96'

    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
});

jQuery(document).ready(function(){

	/////////////////
	//    SCROLL   //
	/////////////////

	if (BrowserDetect.browser == 'Opera' && BrowserDetect.version <= 12) { 
		$('a[data-scroll]').click(function(e){
		    scrollFrom = $(window).scrollTop();
		    var target = $(this).attr('href');
		    $(window.opera?'html':'html, body').animate({ 
		        scrollTop: $(target).offset().top-0
		    },1000);
		});
	} else {
		smoothScroll.init({
		    speed: 500, // scroll speed (ms)
		    easing: 'easeInOutCubic', // easing
		    updateURL: true // url hash update
		});
	}
	
	/////////////////////
	//  HERO "SLIDER"  //
	/////////////////////
	var i = 340;
	var start = true;
	$('.slide .slide-image').each(function() {
		$(this).css("right", i+"px");
		i -= 230;
	});
	//$('.slide .slide-image').css("right", "-1700px");

	$('.slide .col-6.left').css("margin-left", "-1000px");
	$('.slide .col-6.left').css("opacity", "0");
	//$('.slide.active .slide-image').css("right", "-700px");


	var easing = "easeInOutSine";
	$('#icons a').on( 'click', function( event ) {
		event.preventDefault();

		if (start) {
			$('.slide .slide-image').animate({
				right: '-1700px',
				opacity: '0'
			}, {
			  duration: 500,
			  easing: easing
			});

			//$('.slide .slide-image').css("opacity", "0");
		}

		if ($('.slide.active .col-6').is(':animated')) {
	        return;
	    }
	    $('.slide .col-6.right').animate({
			opacity: '0'
		}, 200);

		$('#icons a').removeClass("active");
		$(this).addClass("active");
		var slide = $(this).attr('data-slide');

		$('.slide.active .col-6.left').animate({ 
			marginLeft: '-1000px',
			opacity: '0'
		}, {
		  duration: 500,
		  easing: easing
		});

		$('.slide.active .slide-image').animate({
			right: '-1700px',
			opacity: '0'
		}, {
		  duration: 500,
		  easing: easing
		});

		$('.slide.active').removeClass('active');
		$('#'+slide).addClass('active');

		$('#'+slide).find('.col-6.left').animate({
			marginLeft: '0',
			opacity: '1'
		}, {
		  duration: 500,
		  easing: easing
		});

		$('#'+slide).find('.slide-image').animate({
			right: '-700px',
			opacity: '1'
		}, {
		  duration: 500,
		  easing: easing
		});

	});

	$('.col-6.left').on( 'click', function( event ) {
		event.preventDefault();
		image = $(this).parent().find('.slide-image');
		par = $(this).parent().find('.right');

		image.animate({
			right: '-1150px'
			//opacity: '0'
		}, {
		  duration: 500,
		  easing: easing
		});
		par.css("display", "block");
		par.animate({
			opacity: '1'
		}, {
		  duration: 700,
		  easing: easing
		});

	});

	var inner = $('#awwwards .inner');
	var maxCount = $('.item').length-4;
	var count = 0;
	var marg = parseInt(inner.css('margin-left'));
	var width = parseInt($('#awwwards .item').css('width'))+20;

	$('#awwwards .nav a').on( 'click', function( event ) {

		event.preventDefault();
		if (inner.is(':animated')) {return;}
		
	    if ( $(this).hasClass("left") ) {
	    	if (count <= 0) {
	    		return;
	    	} else {
	    		marg = marg+width;
	    		count -= 1;
	    	}
	    } else if (count < maxCount) {
			marg = marg-width;
			count += 1;
		}

		inner.animate({
			marginLeft: marg+'px'
		}, {
		  duration: 500,
		  easing: easing
		});
	});

	////////////////////////
	//  PLACEHOLDERS FIX  //
	////////////////////////

	if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
	} else if ($.fn.placeholder.input) {
		$('textarea').placeholder();
	} else {
		$('input, textarea').placeholder();
	}

	////////////////////////
	//  FORMS VALIDATION  //
	////////////////////////

	$('a.submit').click(function(e) {
		e.preventDefault();
		$(this).parent().submit();
	});

	$('form').each(function() {
        $(this).validate({
            errorPlacement: $.noop,
	        submitHandler: function(form) {
			    $(form).submitForm();
			}
        });
    });

});

////////////////////////////
//  FORM SUBMIT FUNCTION  //
////////////////////////////

$.fn.submitForm = function() {

	var form = $(this);
	var preloaderHTML = '<div class="form-preloader" style="display: none;"><div><i class="fa fa-refresh fa-spin"></i></div></div>';
	var okHTML = '<i class="fa fa-check"></i><br />Сообщение отправлено!';
	var errorHTML = '<i class="fa fa-frown-o"></i><br />Произошла ошибка!';

	form.parent().append(preloaderHTML);
	var preloader = $(this).parent().find('.form-preloader');

	var preloaderHeight = preloader.height();
	var innerHeight = preloader.find('div').height();
	var preloaderPadding = ((preloaderHeight/2) - innerHeight/2) + 10;
	preloader.css("padding-top", preloaderPadding + "px");

	preloader.fadeIn(300);

	var fields = form.find("input[type=text], input[type=email], input[type=checkbox], textarea");
	var data = {};
	data["formName"] = form.attr("data-title");



	$(fields).each(function(){
		var name = $(this).attr("name");

		if ($(this).attr("type")=="checkbox") {
			if ($(this).is(':checked')) {
				val = "on";
			} else {
				val = "off";
			}
		} else {
			var val = $(this).val();
		}

		data[name] = val;
	});

	data["secret"] = "2f7d9f0d0acf89a8f6a57d79f0f7d475";

	var isError = false;

	$.ajax({
	  type: "POST",
	  url: "/",
	  data: JSON.stringify(data),
	  contentType: "application/json; charset=utf-8",
      success: function (data) {
      	preloader.find('div').html(okHTML);
      },
      error: function (data) {
      	isError = true;
      	preloader.find('div').html(errorHTML);
      }
	});

	$('.form-preloader').click(function() {
		$(this).fadeOut(300, function() {
			$(this).remove();
		});
		if (!isError) {
			fields.val('');
		}
	});

}

/////////////////////////
//  BROWSER DETECTION  //
/////////////////////////

var BrowserDetect = 
{
    init: function () 
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) 
    {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

BrowserDetect.init();