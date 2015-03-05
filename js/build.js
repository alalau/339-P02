$(function() {
    function spacerSize() {
        var w = $(window).width() * 0.9;
        $("#spacer").css({
            width: w
        })
    }

    spacerSize();

    $(window).resize(function() {
        spacerSize();
    });

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
            //console.log("first part: " + offsetFirstPart + " hand: " + offsetHand);
        }



		/* -----------------------------------------------------------
			Horizontal Scrolling
        ----------------------------------------------------------- */

	   	var wrapper = document.querySelector('#wrapper');
		horwheel(wrapper);


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
			Instantiate the various part choice pickers
        ----------------------------------------------------------- */

        /*
		var picker_1 = '<div class="picker"><button class="add" value="1">Add Part #1</button><button class="add" value="2">Add Part #2</button><button class="add" value="3">Add Part #3</button></div>';
		var picker_2 = '<div class="picker"><button class="add" value="4">Add Part #4</button><button class="add" value="5">Add Part #5</button><button class="add" value="6">Add Part #6</button></div>';
        var picker_3 = '<div class="picker"><button class="add" value="7">Add Part #7</button><button class="add" value="8">Add Part #8</button><button class="add" value="9">Add Part #9</button></div>';
        var picker_4 = '<div class="picker"><button class="add" value="10">Add Part #10</button><button class="add" value="11">Add Part #11</button><button class="add" value="12">Add Part #12</button></div>';
        var picker_5 = '<div class="picker"><button class="add" value="13">Add Part #13</button><button class="add" value="14">Add Part #14</button><button class="add" value="15">Add Part #15</button></div>';
        */

        /* -----------------------------------------------------------
            Keep track of what part we're adding
        ----------------------------------------------------------- */

        var partCount = 1;
        var parts = [];

		/* -----------------------------------------------------------
			Function for creating choice blocks
        ----------------------------------------------------------- */
        /*
		function createBlock( what ){
            partCount++;
            checkAnimate();
			if (what == '1') {
            	return( $( "<div class='block part'>" + picker_1 + "</div>" ) );
            }
            else if (what == '2') {
            	return( $( "<div class='block part'>" + picker_2 + "</div>" ) );
            }
            else if (what == '3') {
            	return( $( "<div class='block part'>" + picker_3 + "</div>" ) );
            }
            else if (what == '4') {
            	return( $( "<div class='block part'>" + picker_4 + "</div>" ) );
            }
            else if (what == '5') {
            	return( $( "<div class='block part'>" + picker_5 + "</div>" ) );
            }
            else if (what >=6) {
            	return( $( "<div class='block'><div class='goods message'><br>" + message + "<br><br><p>Send Message:</p><button>Copy URL</button></div></div>" ) );
            }
        }
        */

        /* -----------------------------------------------------------
			Function for creating parts within blocks
        ----------------------------------------------------------- */

        function createPart( what ){
            // Create the part
            return(
                $( "<div class='block part'><div class='goods'><img src='./img/dominos.svg' id='handpoint'></div></div>" )
            );
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
			Start the user off with a choice or fully built machine
        ----------------------------------------------------------- */

        //getStarted();

        function buildMachine() {
            parts.push(createBuild( "Part 1" ) );
            parts.push(createBuild( "Part 3" ) );
            parts.push(createBuild( "Part 5" ) );
            parts.push(createBuild( "Part 7" ) );
            parts.push(createBuild( "Part 9" ) );
            parts.push(createMessage( "Good Job! Now try creating your own<br>Rube Goldberg Message Machine." ) );
            $( "#rube-container" ).appendEach( parts );
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
            } else {
                // do nothing
            }
        }


        $(".add").click( function() {
            var val = $(this).attr("value");
            nextStep(partCount);
            partCount ++;
	        var newPart = createPart(val);
	        $('#rube-container').append(newPart);
	        var n = $('#rube-container').width() * 2;
            if (partCount > 2) {
    		  $('#wrapper').animate({ scrollLeft: n }, 1000, "easeOutCubic" );
            } else {
               $('#callToActionBlock').removeClass('choose');
            }
	    });

		/* -----------------------------------------------------------
			WIP!
			Deleting parts from the machine
        ----------------------------------------------------------- */
        /*
		$(".part").on("click", ".goods .remove", function () {
	        var parent = $(this).closest(".part");
			$(parent).append(picker);
			$(this).closest(".goods").remove();
			$('#rube-container').prepend(part);
	    });
        */

	    /* -----------------------------------------------------------
			Animate parts on scroll
        ----------------------------------------------------------- */

	    $('#wrapper').scroll(function(){					// trigger when scroll area scrolls
	    	checkAnimate();
            moveCallToAction();
	    })

	//});