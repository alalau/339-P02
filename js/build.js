$(document).ready(function() {
    $('#wrapper').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta);
        e.preventDefault();
    });
});

/* -----------------------------------------------------------
    Resize the spacer block to position the parts correctly
----------------------------------------------------------- */

function spacerSize() {
    var w = $(window).width() * 0.9;
    $("#spacer").css({
        width: w
    })
}

$(function() {
    spacerSize();
});

/* -----------------------------------------------------------
	Move the pointer finger
----------------------------------------------------------- */

function moveCallToAction() {
    var offsetFirstPart = $("#rube-container:nth-child(1)").offset().left + $('#spacer').width();
    var offsetHand = $("#callToActionBlock").offset().left + $("#callToActionBlock").width();
    var handOrigin = ($(window).width() / 2) + ($("#callToActionBlock").width() / 2);
    if (offsetFirstPart < handOrigin) {
        var newLeft = offsetFirstPart - ($("#callToActionBlock").width() / 2) + 4;
        $("#callToActionBlock").css({
            left: newLeft
        })
        $('#scroll-prompt').css({
            opacity: 0
        })
    } else {
        $("#callToActionBlock").css({
            left: ($(window).width() / 2)
        })
        $('#scroll-prompt').css({
            opacity: 1
        })
    }
}

 $(window).resize(function() {
    moveCallToAction();
    spacerSize();
});

/* -----------------------------------------------------------
    Enter Message Box
----------------------------------------------------------- */

var nameEntered = false;
var msgEntered  = false;
var name = '';
var message = '';

function turnOnNextBtn() {
    if (nameEntered == true && msgEntered == true) {
        $('#done-message').addClass('visible');
    } else {
        $('#done-message').removeClass('visible')
    }
}

$('#name-textarea').bind('input', function() {
    var nameText = $.trim($(this).val());
    if (nameText.length > 0) {
        nameEntered = true;
        $('#input').removeClass('single-line');
        $('#message-textarea').removeClass('hidden');
    } else {
        nameEntered = false;
        $('#input').addClass('single-line');
        $('#message-textarea').addClass('hidden');
    }
    turnOnNextBtn();
});

$('#message-textarea').bind('input', function() {
    var msgText = $.trim($(this).val());
    if (msgText.length > 0) {
        msgEntered = true;
    } else {
        msgEntered = false;
    }
    turnOnNextBtn();
});

$("#done-message").click(function() {
    name    = $('#name-textarea').val();
    message = $('#message-textarea').val();
    $('#input').removeClass('onscreen');
    $('#wrapper').removeClass('offscreen');
    $('#picker').removeClass('offscreen');
    $('#callToActionBlock').removeClass('offscreen');
});

/* -----------------------------------------------------------
	Function for appending new elements
----------------------------------------------------------- */

jQuery.fn.appendEach = function( arrayOfWrappers ){
    var rawArray = jQuery.map(				// Map the array of jQuery objects to an array of raw DOM nodes.
        arrayOfWrappers,
        function( value, index ){
            return( value.get() );			// Return the unwrapped version
        }
    );
    this.append( rawArray );				// Add the raw DOM array to the current collection.
    return( this );            				// Return this reference to maintain method chaining.
};

/* -----------------------------------------------------------
    Keep track of what part we're adding
----------------------------------------------------------- */

var partCount = 1;
var parts = [];

var partList = '';
var url='';

/* -----------------------------------------------------------
	Function for creating parts within blocks
----------------------------------------------------------- */

var part_dominos = "<div class='block part'><div class='goods'><img src='./img/dominos-2.svg'></div></div>";
var part_skateboard = "<div class='block part'><div class='goods'><img src='./img/skateboard-2.png'></div></div>";
var part_frog = "<div class='block part'><div class='goods'><img src='./img/frog-2.png'></div></div>";

var part_coffee = "<div class='block part'><div class='goods'><img src='./img/coffee-2.png'></div></div>";
var part_beer = "<div class='block part'><div class='goods'><img src='./img/beer-2.png'></div></div>";
var part_arrow = "<div class='block part'><div class='goods'><img src='./img/arrow-2.png'></div></div>";

var part_catvideo = "<div class='block part'><div class='goods'><img src='./img/catvideo-2.png'></div></div>" ;
var part_plant = "<div class='block part'><div class='goods'><img src='./img/plant-2.png'></div></div>" ;

var part_kicks = "<div class='block part'><div class='goods'><img src='./img/kicks-2.png'></div></div>" ;

function createPart( what ){
    partList += what;
    customUrl = 'index.php?n=' + name + '&p=' + partList + '&m=' + message; 
    var finalUrl = '<a href="' + customUrl + '">Click Here</a>';
    $( "#finalUrl" ).html(finalUrl);

    // Create the part
    if (what == 'a') {
        return $(part_dominos);
    }
    if (what == 'b') {
        return $(part_skateboard);
    }
    if (what == 'c') {
        return $(part_frog);
    }
    if (what == 'd') {
        return $(part_catvideo);
    }
    if (what == 'e') {
        return $(part_plant);
    }
    if (what == 'f') {
        return $(part_arrow);
    }
    if (what == 'g') {
        return $(part_kicks);
    }
    if (what == 'h') {
        return $(part_coffee);
    }
    if (what == 'i') {
        return $(part_beer);
    }
    else if (what == 'j') {
        return $("<div class='block part last'><div class='goods'><img src='./img/gun-2.png'><div class='gun-message'>" + message + "</div></div>");
    }
    else if (what == 'k') {
        return $("<div class='block part last'><div class='goods final'><img src='./img/film.png'><div class='film-message'>" + message + "</div></div>");
    }
    else if (what == 'l') {
        return $("<div class='block part last'><div class='goods final'><img src='./img/neon.png'><div class='neon-message'>" + message + "</div></div>");
    }
    else {
        return( $( "<div class='block part'><div class='goods'>" + what + "</div></div>" ) );
    }
}

/* -----------------------------------------------------------
	Function for creating fully built part blocks
----------------------------------------------------------- */

function createCallToAction(name) {
    return(
        $( "<div class='block part' id='callToActionBlock'><div class='goods' id='callToAction'><img src='./img/handpoint-test.png' id='handpoint'></div></div>" )
    );
}

function createMessage(message) {
    return(
       $( "<div class='block part'><div class='goods message'>" + message + "<br><br><a href='build.html'><button>create your own message machine</button></a></div></div>" )
    );
}

function createBuild(what) {
    checkAnimate();
	return(
        $( "<div class='block part'><div class='goods'>" + what + "</div></div>" )
    );
}

/* -----------------------------------------------------------
	Check if parts should be animated (based on left distance from window)
----------------------------------------------------------- */

function checkAnimate() {
    $('.goods').each(function() {				// repeate for each part
    	var offset = $(this).offset();			//
    	var xPos = offset.left;					// get distance from left
    	var threshold = ($(window).width() / 2);	// get threshold (half window width)
    	if (xPos < threshold) {	
    		$(this).addClass("activated");		// add class if passed threshold
    	}
	});  
}

/* -----------------------------------------------------------
    Animate Part
----------------------------------------------------------- */


/* -----------------------------------------------------------
	Start the user off with a choice or fully built machine
----------------------------------------------------------- */

//getStarted();

function buildMachine(parts, msg) {
    message = msg;
    var string = parts;
    for (var i = 0, len = string.length; i < len; i++) {
        var partToAdd = string[i];
        var newPart = createPart(partToAdd);
        $('#rube-container').append(newPart);
    }
}

/* -----------------------------------------------------------
	If choice is clicked, add it to the machine
----------------------------------------------------------- */

function nextStep(val) {
    if (val == 1) {
        $('#picker-1').addClass('exitstage');
        $('#picker-2').removeClass('enterstage');
    } else if (val == 2) {
        $('#picker-2').addClass('exitstage');
        $('#picker-3').removeClass('enterstage');
    } else if (val == 3) {
        $('#picker-3').addClass('exitstage');
        $('#picker-4').removeClass('enterstage');
    } else if (val == 4 ) {
        $('#picker-4').addClass('exitstage');
        $('#picker-5').removeClass('enterstage');
    } else if (val == 5) {
        $('#picker-5').addClass('exitstage');
        $('#picker-done').removeClass('enterstage');
    } else {
        // do nothing
    }
}


$(".add").click( function() {
    var val = $(this).attr("data-value");
    nextStep(partCount);
    partCount ++;
    var newPart = createPart(val);
    $('#rube-container').append(newPart);
    var n = $('#rube-container').width() * 1.5;
    if (partCount > 2) {
	  //$('#wrapper').animate({ scrollLeft: n }, 2000, "easeOutCubic" );
    } else {
       $('#callToActionBlock').removeClass('choose');
    }
});

/* -----------------------------------------------------------
	Animate parts on scroll
----------------------------------------------------------- */

$('#wrapper').scroll(function(){					// trigger when scroll area scrolls
	checkAnimate();
    moveCallToAction();
})